import { GoogleGenAI } from "@google/genai"
import {z} from 'zod'
import {zodToJsonSchema } from 'zod-to-json-schema'

const genAi=new GoogleGenAI({
  apiKey:process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema=z.object(
  {

    matchScore:z.number().min(0).max(10).describe("A score between 0 and 100 indicating how well the canndidate's profile matches the job describe, based on the analysis of the resume and self-describe in real time to the job describe"),
    
    technicalQuestions:z.array(z.object({
      question:z.string().describe("The technical question that can be asked in the interview"),
      intention:z.string().describe("The intention behind asking this question"),
      answer:z.string().describe("How to answer the question, like what points to cover, how much time to spend on each question "),
  
    })).min(5).describe("Technical questions that can be asked in the interview"),

    behavioralQuestions:z.array(z.object({
      question:z.string().describe("The behavioral question that can be asked in the interview"),
      intention:z.string().describe("The intention behind asking this question"),
      answer:z.string().describe("How to answer the question, like what points to cover, how much time to spend on each question "),
    })).min(5).describe("Behavioral questions that can be asked in the interview"),

    skillsRequired:z.array(z.object({
      skill:z.string().describe("The skills which the candidate should improve"),
      severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap, whether it's a minor improvement or a critical one that needs immediate attention")
    })).min(5).describe("The severity of the skill gap, whether it's a minor improvement or a critical one that needs immediate attention"),

    preparationPlan:z.array(z.object({
      day:z.number().describe("The day number in the preparation plan, starting from 1"),
      focus:z.string().describe("The main focus of the day, like which topic to cover or which type of questions to practice"),
      tasks:z.array(z.string()).describe("The specific tasks to be done on that day, like reading a chapter, watching a video, solving a set of questions, etc.")
    })).min(5).describe("A day-wise preparation plan for the candidate to follow in order to improve their chances of success in the interview ")
  }
)

async function generateInterviewReport(
  {resume,selfDescription,jobDescription}){

    const prompt=`You are an expert technical recruiter and interview coach. Your task is to create a comprehensive interview preparation report, according to the schema, ask question according to the job description and candidate profile, and provide a detailed preparation plan.
    Resume:${JSON.stringify(resume)}
    Self-description:${JSON.stringify(selfDescription)}
    Job description:${JSON.stringify(jobDescription)}`

    const response=await genAi.models.generateContent(
      {
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
          responseMimeType:"application/json",
          responseJsonSchema:zodToJsonSchema(interviewReportSchema)
        }
      }
    )

    return ("Generated interview report:",response.text)



 
  }

export {generateInterviewReport}