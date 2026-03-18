import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express()

app.use(cors({
  origin:process.env.CORS || 'http://localhost:5173',
  credentials:true
}))

 console.log("CORS value:", process.env.CORS)

app.use(express.json({
  limit:"16kb"
}))


app.use(express.urlencoded({
  extended:true,
  limit:"16kb"
}))

app.use(cookieParser())




import routes from './routes/user.routes.js'

app.use("/api/v1/users",routes)

export {app}