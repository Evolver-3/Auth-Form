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
  }
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
  }
)

const skillSchema=new mongoose.Schema(
  {
    skill:{
      type:String,
      required:[ true, "Skill is required" ]
    },
    severity:{
      type:String,
      enum:["Low","Medium","High"],
      required:[ true, "Severity is required" ]
    }
  }
)

const preparationSchema=new mongoose.Schema(
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
  }
)
const InterviewReportSchema=new mongoose.Schema(
  {
    title:{
      type:String,
      required:[true,"title is required"]
    },
    ReportScore:{
      type:Number,
      required:true
    },
    resume:{
      type:String,
      required:true

    },
    selfDescription:{
      type:String,
      required:true

    },
    jobDescription:{
      type:String,
      requried:true
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion:[behavioralQuestionSchema],
    skillsRequired:[skillSchema],
    preparationPlan:[preparationSchema],
    
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  
  },
  {
    timestamps:true
  }
)

export const ReportSchema=mongoose.model("ReportSchema",InterviewReportSchema)