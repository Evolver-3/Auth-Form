import {generateInterviewReport,getInterviewReportById,getAllInterviewReports} from '../services/interview.api.js'
import { useContext,useEffect } from 'react'
import { InterviewContext } from '../interview.context.jsx'
import { useParams } from 'react-router-dom'


export const useInterview=()=>{

  const context=useContext(InterviewContext)
  const {interviewId}=useParams()


 if(!context){
  throw new Error ("useInterview must be used within an InterviewProvider")
 }

 const {loading,setLoading, report, setReport, reports, setReports}=context


 const generateReport=async({jobDescription, selfDescription, resume})=>{

  setLoading(true)
  let res=null

  try{
     res=await generateInterviewReport({jobDescription, selfDescription, resume})

    setReport(res.data)
    console.log(res.data)


  }catch(error){
    console.error("Error generating interview report:",error)
  }finally{
    setLoading(false)
  }
  return res.data
  
 }


  const generateReportById=async(interviewId)=>{

    setLoading(true)

    let res=null
    try{
       res=await getInterviewReportById(interviewId)
      setReport(res.data)
      console.log(res.data)
      
    }catch(error){
      console.error("Error generating interview report by ID:",error)
    }finally{
      setLoading(false)
    }
    return res.data
    
  }

  const generateAllReports=async()=>{
    setLoading(true)

    let res=null

    try{
      res=await getAllInterviewReports()
      setReports(res.data)

      
    }catch(error){
      console.error("Error generating all interview reports:",error)
    }finally{
      setLoading(false)

    }
    return res.data  
  }

  useEffect(()=>{
    if(interviewId){
      generateReportById(interviewId)
    }else{
      generateAllReports()
    }
  },[interviewId])



  return {loading,report,reports,generateReport,generateReportById,generateAllReports}
}