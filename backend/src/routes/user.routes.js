import { Router } from "express";

import {loginUser, registerUser,logoutUser, refreshAccessToken, getUserProfile,changeCurrentPassword,updateAvatar,updateCoverImage} from '../controllers/user.controller.js'

import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const router=Router()

// route for registerUser

router.route("/register").post(
  upload.fields([
    {
      name:"avatar",
      maxCount:1
    }, 
    {
      name:"coverImage",
      maxCount:1
    }
  ]),registerUser)



router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/changePassword").post(verifyJWT,changeCurrentPassword)

router.route("/updateAvatar").patch(verifyJWT,upload.single("avatar"),updateAvatar)

router.route("/updateCoverImage").patch(verifyJWT,upload.single("coverImage"),updateCoverImage)

router.route("/profile").get(verifyJWT,getUserProfile) 

export default router