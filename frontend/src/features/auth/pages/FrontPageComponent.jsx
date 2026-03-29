import { Link } from "react-router-dom"

export const FrontPageComponent=({children,text,textspan,point})=>{
  return(
    <main >
      <div className="flex border-1 border-neutral-300 r shadow-finta h-screen rounded-xl p-6">
      <div className="w-1/2 md:w-[45%] bg-rose-200 rounded-tl-xl rounded-bl-xl">
        {children}
      </div>

      <div className="w-1/2 md:w-[55%] bg-neutral-400 rounded-tr-xl rounded-br-xl">
        <div className="container">
        <p>{text} <Link to={point}>{textspan}</Link></p>
        </div>
      </div>

    </div>
  
    </main>

  )
}