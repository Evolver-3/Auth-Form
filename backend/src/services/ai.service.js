import { GoogleGenAI } from "@google/genai"
import { z} from 'zod'
import {zodToJsonSchema } from 'zod-to-json-schema'

const genAi=new GoogleGenAI(
  {
    apiKey:process.env.GOOGLE_GENAI_API_KEY
  }
)

const AiSchema =z.object(
  {
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),

    title: z.string().describe("The title of the job for which the interview report is generated"),

    technicalQuestions: z.array(
      z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    behavioralQuestions: z.array(
      z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    
    skillGaps: z.array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(
      z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively")
})

function parseIfString(item){
  if(typeof item === "string"){
    try{
      return JSON.parse(item)

    }catch{
      return null
    }
  }
  return item
}

function fixArray(arr){
  if(!Array.isArray(arr))return []

  return arr.map(parseIfString).filter(item=>item !==null)
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }){
  const prompt = `You are an expert technical interviewer. Analyze the candidate and generate an interview preparation report.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Strict format:

{ 
  "title": "string",
  "matchScore": "number",
  "technicalQuestions":[
                      {"question":"string",
                      "intention":"string",
                      "answer":"string"}
                      ],
  "behavioralQuestions":[
                    {"question":"string",
                    "intention":"string",
                    "answer":"string"}
                    ],
  "skillGaps":[
            {"skill":"string",
            "severity":"low/medium/high"}
            ],
 
 preparationPlan:[
                {"day":1,
                "focus":"string",
                "tasks":["string"]}
]}
  STRICT RULES:

- technicalQuestions MUST contain 3 min items
- behavioralQuestions MUST contain 3 min items
- skillGaps MUST contain at least 3 items
- preparationPlan MUST contain exactly 7 days

- DO NOT return empty arrays
- DO NOT skip any field
- DO NOT return strings instead of objects
- Each item MUST be a proper JSON object (not stringified)

If any section is empty, REGENERATE internally before responding.

Return ONLY valid JSON.`


 let raw;
    try{
      
    const res = await genAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(AiSchema)
      }
    })
    
     raw=res.text
     raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed=JSON.parse(raw)

      parsed.technicalQuestions = fixArray(parsed.technicalQuestions);
      parsed.behavioralQuestions = fixArray(parsed.behavioralQuestions);
      parsed.skillGaps = fixArray(parsed.skillGaps);parsed.preparationPlan = fixArray(parsed.preparationPlan);

      const validated=AiSchema.parse(parsed)

      return validated
    }catch(error){

      console.error(" Raw AI response :/n", raw)
      console.error("Error:", error.message)

      throw new Error("Failed to generate a valid interview report.")
    }
}
     



export {generateInterviewReport}


