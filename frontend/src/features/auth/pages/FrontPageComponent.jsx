import { Link } from "react-router-dom"

export const FrontPageComponent=({children,text,textspan,point})=>{
  return(
    <main >
      <div className=" flex h-screen gap-4 px-5 py-4 ">
   
        <div className="w-[60%] py-4 bg-slate-200 shadow-weird rounded-3xl">
          {children}
          <p className="text-[12px] md:text-[15px] text-center ">{text} <Link
          className="text-blue-600 hover:underline hover:underline-offset-2 transform-gpu duration-200 focus:scale-[101%]" to={point}>{textspan}</Link></p>
        </div>
    
        <div className="w-[40%]  relative bg-neutral-300 z-0 group  overflow-hidden hover:bg-neutral-400 transform-cpu duration-300 rounded-xl ">

          <div className="w-full absolute inset-0 bg-[url('/Cover.jpg')] bg-cover bg-center bg-no-repeat opacity-80 group-hover:scale-110 transform-gpu duration-300"></div>

          <div className='absolute top-1/3 flex flex-col items-center justify-center text-center gap-5'>
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-slate-600">Rate Your Resume</h2>
            <p className=" text-netural-800 text-sm md:text-lg lg:text-xl md:px-8 font-normal md:font-semibold leading-tight">ReaI is the fast and effective website. For generating report for your Resume.</p>
          </div>
        </div>
    

    </div>
  
    </main>

  )
} 