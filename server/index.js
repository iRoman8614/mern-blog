import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import fileUpload from "express-fileupload"

import authRoute from "./routes/auth.js"
import postsRoute from "./routes/posts.js"
import commentRoute from "./routes/comment.js"

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT 
const DB_USER = process.env.DB_USER 
const DB_PASSWORD = process.env.DB_PASSWORD 
const DB_NAME = process.env.DB_NAME 

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes 
app.use('/api/auth', authRoute)
app.use('/api/post', postsRoute)
app.use('/api/comments', commentRoute)


async function start() {
    try {
        await mongoose
            .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mern-stack-blog.wye8wvx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
            .then(console.log("database connected"))

        app.listen(5000, () => {
            console.log(`server started on port ${PORT}` || 3000)
        }) 
    } catch(error) {
        console.log(error)
    }
}

start()
