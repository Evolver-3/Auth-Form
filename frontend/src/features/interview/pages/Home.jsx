import { useInterview} from '../hooks/useInterview.js'
import {useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import HomePageWrapper from './reportcomp/HomePageWrapper.jsx'

import SpinButton from './reportcomp/SpinButton.jsx'

const Home=()=>{

  const {loading,generateReport}=useInterview()

  const [jobDescription,setJobDescription]=useState("")
  const [selfDescription,setSelfDescription]=useState("")

  const [resumeUploaded,setResumeUploaded]=useState(null)


  const navigate=useNavigate()

  const handleGenerateReport=async()=>{
  

    const data=await generateReport({jobDescription,selfDescription,resume:resumeUploaded})

    console.log(data)
   

    navigate(`/report/${data._id}`)

    return data

  }


  return(
    <HomePageWrapper>
    <div className="alignDiv px-4 md:px-20 lg:px-60">

      <h2 className='h2Headings'>Check your previous Reports</h2>

      <div className='w-full flex flex-col py-10 px-4 items-center justify-between gap-8 rounded-md shadow-weird bg-white'>


        <LabelData text={"selfDescription"} textData={"Self Description"} onChange={(e)=>{setSelfDescription(e.target.value)}} placeholder={"Enter About Yourself"}/>

        <LabelData text={"jobDescription"} textData={"Job Description"} onChange={(e)=>{setJobDescription(e.target.value)}} placeholder={"Enter aboute which job are you targeting"}/>
     
        <label htmlFor="resume" className='flex gap-3 items-center'>
          <span className={`${resumeUploaded ? "text-green-500": "text-red-500"}`}><SvgMedia/></span>
          <h2 className='text-md text-neutral-600 font-semibold'>Upload Resume</h2>
        </label>
        <input hidden onChange={(e)=>setResumeUploaded(e.target.files[0])}  type="file" name='resume' id='resume' accept=".pdf" className="border hover:outline-none"></input>

        <SpinButton onClick={handleGenerateReport} loading={loading} text={"Generate Interview Report"} />

      </div>
   

    </div>
 
    </HomePageWrapper>
  )
}

export default Home

const LabelData=({text,textData,onChange,placeholder})=>{
  return (
    <div className='flex items-center justify-around w-full '>
      <label className=' text-md md:text-lg lg:text-xl text-neutral-600 font-semibold ' htmlFor={text}>{textData}</label>

      <textarea 
      className='w-80 lg:w-2/3 h-[100px] inputstyle'
      onChange={onChange}
      name={text}
      placeholder={placeholder}
      />
    </div>
  )
}

const SvgMedia=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
    fill="currentColor" viewBox="0 0 24 24" >
      <path d="M19 3h-2c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 17H5V5h2v2h10V5h2z"></path><path d="M11 14.09 8.71 11.8 7.3 13.21l3 3c.2.2.45.29.71.29s.51-.1.71-.29l5-5-1.41-1.41-4.29 4.29Z"></path>
    </svg>
  )
}