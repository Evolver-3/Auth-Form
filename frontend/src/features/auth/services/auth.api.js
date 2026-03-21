import axios from 'axios'

const api=axios.create({
  baseURL:"http://localhost:5000",
  withCredentials:true
})

function extractUser(responseData) {
  // Check common locations for user data
  const user = responseData.user || 
               responseData.message || 
               responseData.data?.user || 
               responseData.data;
  
  console.log("extractUser input:", responseData)
  console.log("extractUser output:", user)
  return user;
}

export async function Register({username,fullname,password,email}){

  try{
    const response=await api.post("/api/v1/users/register",{
      username,
      fullname,
      password,
      email
    })
    console.log("Registration response:", response.data)
    return {
      user:extractUser(response.data)
    }
  }catch(error){
    console.log(error)
    throw error
  }
}


export async function login({email,password}){

  try{
    const response=await api.post("/api/v1/users/login",{
      email,
      password
    })
    console.log("Login response:", response.data)
    const user = extractUser(response.data)
    console.log("Extracted user from login:", user)
  
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

  
    console.log("Response data:", response.data)
   
    
    const user = extractUser(response.data)
    console.log("Extracted user from profile:", user)
    
  
    const result = { user }      
    console.log("Returning from profile():", result)

    return result
  }catch(error){
    console.log(error)
    return {user:null}
  }
}