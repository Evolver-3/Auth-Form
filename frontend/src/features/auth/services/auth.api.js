import axios from 'axios'


const api=axios.create({
  baseURL:"http://localhost:5000",
  withCredentials:true
})

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

          console.log(avatar)
          
          
        if(avatar)formData.append("avatar",avatar)
        if(coverImage)formData.append("coverImage",coverImage)

          for(let pair of formData.entries()){
            console.log(pair[0],pair[1])
          }


            const res=await api.post("/api/v1/users/register",formData,{
              transformRequest:(data)=>data
            })
            console.log("Full response:", res)
console.log("res.data structure:", Object.keys(res.data))
console.log("res.data content:", JSON.stringify(res.data, null, 2))

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

    // console.log("Response data:", response.data)
   
    const user = extractUser(response.data)
    // console.log("Extracted user from profile:", user)
    
    const result = { user }    


    return result
  }catch(error){
    console.log(error)
    throw error
  }
}


export async function updateProfile({avatar}){
  try{
    const response=await api.patch("/api/v1/users/updateAvatar",{avatar})

    const user=extractUser(response.data)

    console.log(user)

  }catch(error){
    console.log(error)
    throw error
  }
}
