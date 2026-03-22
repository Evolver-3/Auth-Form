import { asyncHandler } from "../utils/asyncHandler.js"
import pdf from "pdf-parse-fork"
import { generateInterviewReport } from "../services/ai.service.js"
import { InterviewReport } from "../models/interviewReport.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const generateInterviewController=asyncHandler(async(req,res)=>{

    if(!req.file){
      throw new ApiError(400, "Resume file is required !!")
    }
  
     const {selfDescription,jobDescription}=req.body

     if(!selfDescription || !jobDescription){
      throw new ApiError(400, "selfDescription and jobDescription are required !!")
     }

    const resumeData=await pdf(req.file.buffer)
    const resumeText=resumeData.text

   

    const interviewReportByAi=await generateInterviewReport({
      resume:resumeText,
      selfDescription,
      jobDescription
    })

    const interviewReport=await InterviewReport.create({
      user:req.user._id,
      jobDescription,
      resume:resumeText,
      selfDescription,
      matchScore:interviewReportByAi.matchScore,
      technicalQuestions:interviewReportByAi.technicalQuestions,
      behavioralQuestions:interviewReportByAi.
      behavioralQuestions,
      skills:interviewReportByAi.skills,
      preparation:interviewReportByAi.preparation
    })

    res.status(200).json(
      new ApiResponse(200,interviewReport,"interview report generated successfully !!")
    )
 
  

  
})



export { generateInterviewController}