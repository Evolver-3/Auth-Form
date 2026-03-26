import { asyncHandler } from "../utils/asyncHandler.js";
import pdf from 'pdf-parse-fork'
import { generateInterviewReport } from '../services/ai.service.js'
import {ReportSchema} from '../models/interviewSchema.models.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



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

  const ReportAi=await generateInterviewReport(
    {
      resume:resumeText,
      selfDescription,
      jobDescription
    }
  )
  
  const interReport=await ReportSchema.create(
    {
     user:req.user.id,
     resume:resumeText,
     selfDescription,
     jobDescription,
     ...ReportAi
    }
  )


  res.status(200).json(
    new ApiResponse(200, "created successfully !!", interReport)
  )

})

const getInterviewControllerById=asyncHandler(async(req,res)=>{

  const {interviewId}=req.params

  const interviewReport=await ReportSchema.findOne(
    {
      _id:interviewId,
      user:req.user.id
    }
  )
  if(!interviewReport){
    throw new ApiError(404, "Interview report not found !!")
  }

  res.status(200).json(
    new ApiResponse(200, "report at the userId !!", interviewReport)
  )
})

const getAllInterviewReportController=asyncHandler(async(req,res)=>{

  const interviewReports=await ReportSchema.find(
    {
      user:req.user.id
    }
  ).sort(
    {
      createdAt:-1
    }
  ).select(
    "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
  ).lean()

  res.status(200).json(
    new ApiResponse(200, "All interview Report fetched successfully", interviewReports)
  )
})



export {generateInterviewController,getInterviewControllerById,getAllInterviewReportController}