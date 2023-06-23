import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        }, //unique nickname
        password: {
            type: String,
            required: true,
        }, //hashed password
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    { timestamps: true }, //add creating and updating times
)

export default mongoose.model('User', UserSchema)