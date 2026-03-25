import {generateInterviewReport,getInterviewReportById,getAllInterviewReports} from '../services/interview.api.js'
import { useContext } from 'react'
import { InterviewContext } from '../interview.context.jsx'


export const useInterview=()=>{

  const context=useContext(InterviewContext)


 if(!context){
  throw new Error ("useInterview must be used within an InterviewProvider")
 }

 const {loading,setLoading, report, setReport, reports, setReports}=context


 const generateReport=async({jobDescription, selfDescription, resume})=>{

  setLoading(true)


  try{
    const res=await generateInterviewReport({jobDescription, selfDescription, resume})

    setReport(res)
    console.log(res)
 

    return res


  }catch(error){
    console.error("Error generating interview report:",error)
  }finally{
    setLoading(false)
  }
  
 }


  const generateReportById=async(interviewId)=>{

    setLoading(true)


    try{
      const res=await getInterviewReportById(interviewId)
      setReport(res)
      return res
    }catch(error){
      console.error("Error generating interview report by ID:",error)
    }finally{
      setLoading(false)
    }
    
  }

  const generateAllReports=async()=>{
    setLoading(true)

    try{
      const res=await getAllInterviewReports()
      setReports(res)
      return res
    }catch(error){
      console.error("Error generating all interview reports:",error)
    }finally{
      setLoading(false)

    }
    
  }



  return {loading,report,reports,generateReport,generateReportById,generateAllReports}
}