import Post from "../models/Post.js"
import User from "../models/User.js"
import Comment from '../models/Comment.js'
import path, {dirname} from 'path'
import { fileURLToPath } from "url"

//create post
export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)
         
        // if file added
        if(req.files) {
            //create file name by date of add
            let fileName = Date.now().toString() + req.files.image.name
            //get current directory path to const with path 
            const __dirname = dirname(fileURLToPath(import.meta.url))
            //move file to directory uploads. Get current path from __dirname, go out from this dir by '..', go to 'uploads' dir
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage}
            })
            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })

        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithoutImage}
        }) 
        return res.json(newPostWithoutImage)

    } catch (error) {
        console.log(error)
        return res.json({message: "Something is wrong, post can't be created"})
    }
}

// get all posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')
        if(!posts) {
            res.json({message: "No posts"})
        }
        res.json({posts, popularPosts})
    } catch (error) {
        console.log(error)
        res.json({message: "error"})
    }
}

// get post by id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1},
        })
        res.json(post)
    } catch (error) {
        console.log(error)
        res.json({message: "not found"})
    }
}

// get user's posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            }),
        )

        res.json(list)
    } catch (error) {
        console.log(error)
        res.json({message: "not found"})
    }
}


// remove post
export const removePost = async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post) return res.json({message: "not found"})
        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id }
        })
        res.json({message: "post was deleted"})
    } catch (error) {
        console.log(error)
        res.json({message: "something went wrong"}) 
    }
}

//update post
export const updatePost = async (req, res) => {
    try {
        const {title, text, id} = req.body
        const post = await Post.findById(id)

        if(req.files) {
            //create file name by date of add
            let fileName = Date.now().toString() + req.files.image.name
            //get current directory path to const with path 
            const __dirname = dirname(fileURLToPath(import.meta.url))
            //move file to directory uploads. Get current path from __dirname, go out from this dir by '..', go to 'uploads' dir
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }
        post.title = title
        post.text = text

        await post.save()
        res.json(post)
    } catch (error) {
        console.log(error)
        res.json({message: "something went wrong"})
    }
}

// Get Post Comments
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({ message: 'something went wrong' })
    }
}