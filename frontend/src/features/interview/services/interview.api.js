import axios from 'axios'

const api=axios.create({
  baseURL:"http://localhost:5000/api/v1/users",
  withCredentials:true

})

export const generateInterviewReport=async({jobDescription, selfDescription,resume})=>{

  const formData=new FormData()

  formData.append("jobDescription",jobDescription)
  formData.append("selfDescription",selfDescription)
  formData.append("resume",resume)

  const res= await api.post("/interview",formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  }
)
console.log(res.data)
return res.data

}


export const getInterviewReportById=async(interviewId)=>{
  try{
    console.log("Fetching report for interview ID:", interviewId)
  const res=await api.get(`/interview/report/${interviewId}`)
  console.log("Received response:", res.data)
  return res.data
  }catch(error){
    console.error("Error fetching report by ID:", error)
  }


}

export const getAllInterviewReports=async()=>{
  const res=await api.get("/interview/report")

  return res.data
}