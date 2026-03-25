import { useInterview} from '../hooks/useInterview.js'
import {useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'

const Home=()=>{

  const {loading,generateReport}=useInterview()

  const [jobDescription,setJobDescription]=useState("")
  const [selfDescription,setSelfDescription]=useState("")
  const resumeRef=useRef()

  const navigate=useNavigate()

  const handleGenerateReport=async()=>{
    const resumeFile=resumeRef.current.files[0]

    const data=await generateReport({jobDescription,selfDescription,resume:resumeFile})
   

    navigate(`/report/${data._id}`)

    return data

  }
 
  if(loading){
    return (
      <main>
        <h1>Generating your interview report ...</h1>
      </main>
    )
  }

  return(
    <main className="h-screen flex flex-col items-center justify-center gap-5 ">

      <div className=" border border-netrual-100 rounded-md px-5 py-5 flex items-center justify-center gap-5 ">
        <label htmlFor="JobDescription" >Job Description</label>
        <textarea
        onChange={(e)=>(setJobDescription(e.target.value))}
        name="jobDesciption" placeholder="Enter job description here" id="jobDescription"></textarea>
      </div>

      <div className='border border-neutral-100 rounded-md  flex flex-col items-center justify-center gap-2 px-5 py-5'>
        <div className="flex items-center gap-5 ">
          <label htmlFor="resume" >Upload Resume</label>
          <input hidden ref={resumeRef}  type="file" name='resume' id='resume' accept=".pdf" className="border hover:outline-none bg-rose-200"></input>
        </div>

        <div className="flex items-center gap-5">
          <label htmlFor='selfDesciption'>Self Description</label>
          <textarea 
          onChange={(e)=>(setSelfDescription(e.target.value))}
          className="" name="selfDescription" placeholder="Enter your self Description here" id="selfDescription"></textarea>
        </div>

        <button
        onClick={handleGenerateReport}
        className="">Generate Interview Report</button>
      </div>
    </main>

  )
}

export default Home