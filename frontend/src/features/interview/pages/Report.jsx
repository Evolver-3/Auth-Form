import { useEffect, useState } from 'react'
import {useInterview} from '../hooks/useInterview.js'
import {motion} from 'motion/react'
import HomePageWrapper from './reportcomp/HomePageWrapper.jsx'


const Report =()=>{

  const [activeTab,setActiveTab]=useState("tech")
  const [activeIndex,setActiveIndex]=useState(null)

  const {report,loading}=useInterview()

  if(loading){
    return <h1 className='h1style'>Loading .......</h1>
  }

  const scoreColor=report?.matchScore>80?"text-blue-500":report?.matchScore>50?"text-yellow-500":"text-red-500"


  const reportScore=report?.matchScore
  const reportTechnical=report?.technicalQuestions
  const reportBehavioral=report?.behavioralQuestions
  const reportSkillGaps=report?.skillGaps
  const reportRoadmap=report?.preparationPlan

  

  const severityColor=[
    {color:"text-green-500",label:"low"},
    {color:"tex-yellow-500",label:"medium"},
    {color:"text-red-500",label:"high"}
  ]


 const handleTabChange=(tab)=>{
  setActiveTab(tab)
  setActiveIndex(null)
 }

  return(
    <HomePageWrapper>
      <div className='h-screen py-6 px-3'>

        <h2 className='h2Headings'>Generated Report</h2>

        <div className='mt-2 flex pt-8 shadow-finta bg-slate-100 '>
          
          <div className=' flex flex-col gap-5 pt-2 w-1/3 overflow-hidden items-center'>

            <div className='flex'>
              <div className='shadow-finta rounded-full ring-2 '>
                <div className='flex flex-col items-center px-3 py-1'>
                  <h1 className={`${scoreColor} font-semibold text-xl`}>{reportScore}</h1>
                  <h2 className='font-semibold text-lime-500 text-triple'>Score</h2>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center gap-2 border-1 border-rose-600 w-full px-2'>
              {reportTechnical && (
                <DataBox item={"Technical Questions"} onClick={()=>handleTabChange("technical Questions")}/>
              )}
              {reportBehavioral && (
                <DataBox item={"Behavioral Questions"} onClick={()=>handleTabChange("behavioral Questions")}/>
              )}
              {reportRoadmap && (
                <DataBox item={"Roadmap"} onClick={()=>handleTabChange("preparationPlan")}/>
              )}
            </div>
            
            <div className=''>
            {reportSkillGaps && ( 
              <div className='flex flex-col items-center'>
                <h2 className='font-bold text-neutral-700'>
                  Skill to Improve
                </h2>
              <SkillBox gap={reportSkillGaps} className={`${severityColor[0].color}`} />
              </div>
            )}
            </div>

          </div>

          <div className={`w-2/3 flex flex-col gap-5 overflow-scroll `}>
            <div className='w-49/50 px-3'>
              {activeTab==="technical Questions" &&
              reportTechnical?.map((q,idx)=>(
                <QuestionBox 
                key={idx} 
                data={q}
                index={idx}
                isOpen={activeIndex ===idx}
                onClick={()=>
                setActiveIndex(activeIndex === idx? null :idx)
              }/>
              ))}
              
              {activeTab==="behavioral Questions" && reportBehavioral?.map((q,idx)=>(
                <QuestionBox 
                key={idx} 
                data={q}
                index={idx}
                isOpen={activeIndex === idx}
                onClick={()=>
                setActiveIndex(activeIndex === idx? null :idx)
                } />
              ))}
            
              {activeTab==="preparationPlan" && reportRoadmap?.map((item,idx)=>(
                <RoadMapBox
                key={idx}
                data={item}
                isOpen={activeIndex === idx}
                onClick={()=>
                setActiveIndex(activeIndex === idx? null :idx)
                }/>
              ))}
            
            </div>
          </div>

        </div>
      </div>

    </HomePageWrapper>

  )
}

export default Report

const DataBox=({item,onClick})=>{
  return (
    <div className=' hover:shadow-none transition-all duration-300 rounded-sm  w-full bg-rose-100 cursor-pointer shadow-weird hover:ring-1 hover:ring-slate-300  hover:scale-[98%] active:scale-100 '>
      <h2 className='text-slate-500 text-[12px] leading-tight md:text-sec font-semibold text-center cursor-pointer hover:text-slate-600 py-1 text-shadow-xs sm:px-1.5'
      onClick={onClick}>{item}</h2>
    </div>

  )
}

const SkillBox=({gap,className})=>{
  return (
    <ul className={` ${className} flex flex-col gap-2 py-4 px-3`}>
      {gap.map((item,idx)=>(
        <li key={idx} className='font-mono text-[10px] md:text-[16px] px-2 py-1 rounded-sm bg-red-100 leading-tight shadow-soft'>{item.skill}</li>
      ))}
    </ul>
  )
}

const QuestionBox=({data,isOpen,onClick,index})=>{
 
  return (
    <div className='my-3 '>  
      <div onClick={onClick} >
        <Comp headings={`Question ${index+1}.`}
        data={data.question } 
        spanClassName={"text-neutral-500 "} 
        className={" bg-neutral-200 rounded-md ring-neutral-300   shadow-finta "} />
      
      </div>
  
     {isOpen && (
       <div className='mt-3'>
        <CompInner headings={"Intention-"} 
        data={data.intention} />
        
        <CompInner headings={"Expected Answer-"} 
        data={data.answer } />
       </div>
     )}

    </div>
  )
}

const RoadMapBox=({data,isOpen,onClick})=>{
  return (
    <div className='my-3'>
      <div onClick={onClick} className=''>
        <Comp headings={`Day ${data.day}`}
        spanClassName={"text-black"} 
        className={"bg-neutral-200 rounded-md ring-neutral-300   shadow-finta relative"} >
          </Comp>

      </div>

        {isOpen && (
       <div className='mt-3'>
        <CompInner headings={"Focus Area"} 
        data={data.focus } />
        
        <CompInner headings={"tasks"} 
        data={data.tasks } 
        pclassName=''/>
       </div>
     )}
       
      
    </div>
  )
}

const Comp=({className,data,headings})=>{
  return (
    <div className={`${className} shadow-finta ring-1 ring-neutral-300 p-2 relative cursor-pointer`}>

      <p className={`text-[10px] md:text-[14px] lg:text-[18px] leading-tight`}>
        <span className={` text-slate-600 font-bold mr-2`}>{headings}</span>{data}
      </p>

      <div
      className='w-3 absolute right-2 bottom-2 rounded-full bg-neutral-300'>
         <SvgDown/>
      </div>
    </div>
  )
}

const CompInner=({className,data,headings})=>{
  return(
    <div className={`${className} shadow-finta ring-1 ring-neutral-300 p-3 mb-2`}>
      <p className='text-[10px] md:text-[14px] lg:text-[18px] leading-tight text-slate-500'>
        <span className='text-slate-600 font-bold mr-2 '>{headings}</span>
        {data}
      </p>
    </div>
  )
}


const SvgDown=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor" viewBox="0 0 24 24" >
      <path d="m12 15.59-4.29-4.3-1.42 1.42 5.71 5.7 5.71-5.7-1.42-1.42z"></path>
      <path d="m12 10.59-4.29-4.3-1.42 1.42 5.71 5.7 5.71-5.7-1.42-1.42z"></path>
    </svg>
  )
}