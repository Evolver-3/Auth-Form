import express from 'express'
import {Router} from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { generateInterviewController } from '../controllers/interview.controller.js'
import { upload } from '../middleware/multer.middleware.js'

const interviewRouter=Router()

interviewRouter.route("/report").post(verifyJWT,upload.single("resume"),generateInterviewController)





export {interviewRouter}