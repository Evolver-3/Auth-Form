import './src/config/config.js'

import { app } from './src/app.js'

import { connectDB } from './src/database/db.js'



connectDB().then(()=>{
  app.listen(process.env.PORT  || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}).catch((error)=>{
  console.error("failed to connect to the database:",error)
})