import mongoose from 'mongoose'

const technicalQuestionSchema=new mongoose.Schema(
  {
    question:{
      type:String,
      required:[true,"question is required"]
    },
    intention:{
      type:String,
      required:[ true, "Intention is required" ]
    },
    answer:{
      type:String,
      required:[ true, "Answer is required" ]
    }
  },
  {_id:false}
)

const behavioralQuestionSchema=new mongoose.Schema(
  {
    question:{
      type:String,
      required:[ true, "Question is required" ]
    },
    intention:{
      type:String,
      required:[ true, "Intention is required" ]
    },
    answer:{
      type:String,
      required:[ true, "Answer is required" ]
    }
  },
  {_id:false}
)

const skillGapSchema=new mongoose.Schema(
  {
    skill:{
      type:String,
      required:[ true, "Skill is required" ]
    },
    severity:{
      type:String,
      enum:["low","medium","high"],
      required:[ true, "Severity is required" ]
    }
  },
  {_id:false}
)

const preparationPlanSchema=new mongoose.Schema(
  {
    day:{
      type:Number,
      required:[ true, "Day is required" ]
    },
    focus:{
      type:String,
      required:[ true, "Focus is required" ]
    },
    tasks:[
      {
        type:String,
        required:[ true, "Task is required" ]
      }
    ]
  },
  {_id:false}
)
const InterviewReportSchema=new mongoose.Schema(
  {
    title:{
      type:String,
      required:[true,"title is required"]
    },
    matchScore:{
      type:Number,
      required:[true,"matchScore is required"],
      min:0,
      max:100
    },
    resume:{
      type:String,
      required:[true, "resume is required"]

    },
    selfDescription:{
      type:String,
      required:[true, "Self description is required"]
    },
    jobDescription:{
      type:String,
      required:[true, "Job description is required"]
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
  
  },
  {
    timestamps:true
  }
)

export const ReportSchema=mongoose.model("ReportSchema",InterviewReportSchema)