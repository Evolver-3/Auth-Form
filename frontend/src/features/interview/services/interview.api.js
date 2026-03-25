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

  const res= await api.post("/report",formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  }
)
console.log(res.data.data)
return res.data.data

}


export const getInterviewReportById=async(interviewId)=>{

  const res=await api.get(`/report/${interviewId}`)
  return res.data.data


}

export const getAllInterviewReports=async()=>{
  const res=await api.get("/")

  return res.data
}