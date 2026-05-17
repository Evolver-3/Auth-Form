import axios from 'axios'


const api=axios.create({
  baseURL:"development" ? "https://reai-sh4r.onrender.com":"http://localhost:5000",
  withCredentials:true
})

// const api=axios.create({
//   baseURL:"http://localhost:5000",
//   withCredentials:true
// })

function extractUser(responseData) {

  const user = responseData.data ||responseData.data?.user || responseData.user || null

  return user;
}

export async function Register({username,fullname,password,email,avatar,coverImage}){

  console.log("Registering data:",{username,fullname,password,email,avatar,coverImage})

  try{
    const formData=new FormData()

    formData.append("username",username)
    formData.append("fullname",fullname)
    formData.append("email",email)
    formData.append("password",password)
    
    if(avatar)formData.append("avatar",avatar)
    if(coverImage)formData.append("coverImage",coverImage)
      
    const res=await api.post("/api/v1/users/register",formData,{
      transformRequest:(data)=>data
    })
    console.log("Full response:", res)

    return{
        user:extractUser(res.data)
    }
        
    
  }catch(error){
    console.log("full error",error)
    console.log("backend error", error.response?.data)
    throw error

  }
}
          


export async function login({email,password}){

  try{
    const response=await api.post("/api/v1/users/login",{
      email,
      password
    })

    const user = extractUser(response.data)
  
  
    return {user}

  }catch(error){
    console.log(error)
    throw error
  }
}

export async function logout(){
  try{
    const response=await api.post("/api/v1/users/logout")
    return response.data

  }catch(error){
    console.log(error)
    throw error
  }
}

export async function profile(){
  try{
    const response=await api.get("/api/v1/users/profile")

    const user = extractUser(response.data)
   
    
    const result = { user }    


    return result
  }catch(error){
    console.log(error)
    throw error
  }
}


export async function updateProfile({avatar}){
  try{
    console.log(avatar)
    const formData=new FormData()

    formData.append('avatar',avatar)
    const response=await api.patch("/api/v1/users/updateAvatar",formData)

    const user=extractUser(response.data)
    return user

  }catch(error){
    console.log(error)
    throw error
  }
}

export async function updatePassword({currentPassword,newPassword,confirmNewPassword}){
  try{
    

    const response=await api.post("/api/v1/users/changePassword",{currentPassword,newPassword,confirmNewPassword})

    console.log("data:",response)
  
    return{
        user:extractUser(response.data)
    }
        
    
  }catch(error){
    const message=error.response?.data?.message || "Something went wrong"
    console.log(error)
    throw new Error(message)
  }
}