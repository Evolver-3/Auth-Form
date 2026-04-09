import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterview } from '../../hooks/useInterview'
import HomePageWrapper from './HomePageWrapper'
import { generateInterviewReport } from '../../services/interview.api'

const AllReport = () => {

  const {reports,generateAllReports}=useInterview()

  const navigate=useNavigate()

const handleClick=(id)=>{

 
  if(id){
 
    navigate(`/report/${id}`)
  }
}

  return (
    <HomePageWrapper>

      <div className='alignDiv px-3'>

        <h2 className='h2Headings'>Check your previous Reports</h2>

        <div className='grid md:grid-cols-2 gap-4'>
          {reports?.map((data,idx)=>(
            
            <div className='bg-slate-100 rounded-md px-3 py-5 flex flex-col gap-4 shadow-weird'
            key={data._id}
            onClick={()=>handleClick(data._id)}>
            <p>{data.title}</p>

            <div className='flex items-center justify-between'>

              <h2 className='text-md font-semibold'>Score:<span className='text-sm font-extralight'> {data.matchScore}</span></h2>
            
            <h2 className='text-sm leading-tight '>{new Date(data?.createdAt).toLocaleDateString("en-IN",{
              day:"numeric",
              month:"short",
              year:"numeric"
            })}</h2>

            </div>
           
           
          </div>
        ))}
        </div>

      </div>

    </HomePageWrapper>
  )
}

export default AllReport