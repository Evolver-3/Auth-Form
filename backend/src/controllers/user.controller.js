import {asyncHandler} from '../utils/asyncHandler.js'
import { User } from '../models/user.models.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'


const generateAccessAndRefreshTokens=async(userId)=>{
  try{
    const user=await User.findById(userId)

    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    user.refreshToken=refreshToken

    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}

  }catch(error){
    console.log("Error generating tokens:", error)
    throw new ApiError(500,"Something went wrong while generating tokens !!")
  }
}

const registerUser=asyncHandler(async(req,res)=>{
  //  console.log(req.body)

  const {username,fullname,email,password}=req.body 
 

  if([username,fullname,email,password].some((field)=>String(field)?.trim()==="")){
    throw new ApiError( 400,"All fields are required !!")
  }
 
  const existedUser=await User.findOne({
    $or:[
      {email},
      {username}
    ]
  })

  if(existedUser){
    throw new ApiError(409,"User with the same email or username already exists !!")
  }

  const user=await User.create({
    fullname,
    username,
    email,
    password
  })

  const createdUser=await User.findById(user._id).select("-password -refreshToken")

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while creating the user !!")
  }

  return res.status(201).json(new ApiResponse(201,
    "User registered successfully !!", createdUser
  ))

})

const loginUser=asyncHandler(async(req,res)=>{

  const {email,password,username}=req.body

  if(!(username || email)){
    throw new ApiError(400, "Email or Username is required !!")
  }

  const user=await User.findOne({
    $or:[
      {email},
      {username}
    ]
  })

  if(!user){
    throw new ApiError(404,"Invalid email or username !!")
  }

  const isPasswordCorrect=await user.comparePassword(password)

  if(!isPasswordCorrect){
    throw new ApiError(401,"Password is incorrect !!")
  }

  const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

  const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

  const options={
    httpOnly:true,
    secure:false
  }

  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{
    user:loggedInUser,accessToken,refreshToken
  },"User logged in successfully !!"
))
})

const logoutUser=asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        refreshToken:undefined
      }
    }, 
    {
      returnDocument:"after"
    }
  )

  const options={
    httpOnly:true,
    secure:false
  }
  return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200,null,"User logged out successfully !!"))
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
   const incomingRefreshToken=req.cookies?.refreshToken || req.body.refreshToken
   
   if(!incomingRefreshToken){
    throw new ApiError(400, "Refresh token is required !!")
   }

   try{
    const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

    const user=await User.findById(decodedToken?._id)

    if(!user){
      throw new ApiError(401,"Invalid refreshToken !!")
    }

    if(incomingRefreshToken!==user?.refreshToken){
      throw new ApiError(401, "Refresh Token is expired. !!")
    }

    const options={
      httpOnly:true,
      secure:false
    }

    const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id)


    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newRefreshToken,options).json(new ApiResponse(200,{
      accessToken,refreshToken:newRefreshToken
    },"Access Token refreshed successfullt"))


   }catch(error){
    throw new ApiError(401,error?.message || "Invalid refreshToken!!")
   }
})

export {registerUser,loginUser,logoutUser,refreshAccessToken}