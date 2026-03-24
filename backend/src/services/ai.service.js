import { GoogleGenAI } from "@google/genai"
import { z} from 'zod'
import {zodToJsonSchema } from 'zod-to-json-schema'

const genAi=new GoogleGenAI(
  {
    apiKey:process.env.GOOGLE_GENAI_API_KEY
  }
)

const AiSchema=z.object({
    
  ReportScore:z.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the canndidate's profile matches the job describe, based on the analysis of the resume and self-describe in real time to the job describe"),

  technicalQuestion:z.array(z.object(
    {
      question:z.string().describe("The technical question that can be asked in the interview"),
      intention:z.string().describe("The intention behind asking this question"),
      answer:z.string().describe("How to answer the question, like what points to cover, how much time to spend on each question")
    }
  )).describe("Technical questions that can be asked in the interview"),

  behavioralQuestion:z.array(z.object(
    {
      question:z.string().describe("The behavioral question that can be asked in the interview"),
      intention:z.string().describe("The intention behind asking this question"),
      answer:z.string().describe("How to answer the question, like what points to cover, how much time to spend on each question ")
    }
  )).describe("Behavioral questions that can be asked in the interview"),

  skillsRequired:z.array(z.object(
    {
      skill:z.string().describe("The skills which the candidate should improve"),
      severity:z.enum(["Low","Medium","High"]).describe("The severity of the skill gap, whether it's a minor improvement or a critical one that needs immediate attention")
    }
  )).describe("Skills gap like what skills are missing for that particular role"),

  preparationPlan:z.array(z.object(
  {
    day:z.number().describe("The day number in the preparation plan, starting from 1"),
    focus:z.string().describe("The main focus of the day, like which topic to cover or which type of questions to practice"),
    tasks:z.array(z.string()).describe("The specific tasks to be done on that day, like reading a chapter, watching a video, solving a set of questions, etc.")
  }
  )).describe("A day-wise preparation plan for the candidate to follow in order to improve their chances of success in the interview "),

  title:z.string().describe("The title of the job position the candidate is applying for, like software engineer, data scientist, etc.")
}
)

async function generateInterviewReport({resume,selfDescription,jobDescription}){

  const prompt=`Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}`


  const res=await genAi.models.generateContent(
    {
      model:"gemini-3-flash-preview",
      contents:prompt,
      config:{
        responseMimeType:"application/json",
        responseJsonSchema:zodToJsonSchema(AiSchema)
      }
    }
  )

  const data=JSON.parse(res.text)
  console.log("Generated AI Report:", data)
  return data
}

export {generateInterviewReport}


