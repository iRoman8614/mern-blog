import Comment from '../models/Comment.js'
import Post from "../models/Post.js"
import User from "../models/User.js"

export const createComment = async(req, res) => {
    try {
        const {postId, comment} = req.body
        const user = await User.findById(req.userId)

        if(!comment) return res.json({message: "comment can't be empty"})

        const newComment = new Comment({ 
            username: user.username,
            comment 
        })
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        console.log(error)
        res.json({message: "something went wrong"})
    }
}
