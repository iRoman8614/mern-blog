import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        username: { type: String }, //author nickname
        title: { type: String, required: true }, 
        text: { type: String, required: true },
        imgUrl: { type: String, default: '' },
        views: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //link to another db table, connecting to users
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], //link to another db table, connecting to comments
    },
    { timestamps: true },
)
export default mongoose.model('Post', PostSchema)