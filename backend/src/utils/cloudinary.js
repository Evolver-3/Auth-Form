import { v2 as cloudinary } from 'cloudinary'
import streamifier from "streamifier"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { 
        resource_type: "auto",
        folder: "auth-app" 
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error)
          return reject(error)
        }
        console.log("Cloudinary upload success:", result.secure_url)
        resolve(result)
      }
    )


    stream.on('error', (error) => {
      console.error("Stream error:", error)
      reject(error)
    })


    streamifier.createReadStream(fileBuffer).pipe(stream)
  })
}

export { uploadToCloudinary }