import {Router} from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'

import { generateInterviewController, getInterviewControllerById , getAllInterviewReportController} from '../controllers/inter.controller.js'
import { upload } from '../middleware/multer.middleware.js'


const interRouter=Router()

interRouter.route("/Report").post(verifyJWT,upload.single("resume"),generateInterviewController)

//report by Id

interRouter.route("/Report/:interviewId").get(verifyJWT,generateInterviewController,getInterviewControllerById)

//all report

interRouter.route("/").get(verifyJWT,getAllInterviewReportController)


export {interRouter}