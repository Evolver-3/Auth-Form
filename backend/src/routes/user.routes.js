import { Router } from "express";

import {loginUser, registerUser,logoutUser, refreshAccessToken, getUserProfile} from '../controllers/user.controller.js'
import { verifyJWT } from "../middleware/auth.middleware.js";


const router=Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/profile").get(verifyJWT,getUserProfile)

export default router