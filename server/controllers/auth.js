import User  from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Register user
export const register = async (req, res) => {
    try {
        const { username, password} = req.body
        const isUser = await User.findOne({ username })
        if(isUser) {
            return res.json({message: "User already exist"})
        }

        const hashSalt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, hashSalt)

        const newUser = new User({
            username,
            password: hashPassword,
        })
        
        const token = jwt.sign(
            {id: newUser._id,}, 
            process.env.JWT_CHIFFRE,
            {expiresIn: "1d"} 
        )

        await newUser.save()
        res.json({
            newUser,
            token, 
            message: "User was created successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({message: "registration error"})
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password} = req.body
        const user = await User.findOne({ username })
        if(!user) {
            return res.json({message: "wrong login"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.json({message: "incorrect email or password"})
        }

        const token = jwt.sign(
            {id: user._id,}, 
            process.env.JWT_CHIFFRE,
            {expiresIn: "1d"} 
        )
        
        return res.json({token, user, message: "Success"})
    } catch (error) {
        console.log(error)
        res.json({message: "login error"})
    }
}

// Get user
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user) {
            return res.json({message: "wrong user"})
        }

        const token = jwt.sign(
            {id: user._id,}, 
            process.env.JWT_CHIFFRE,
            {expiresIn: "1d"} 
        )
        res.json({user, token})
    } catch (error) {
        console.log(error)
        res.json({message: "access denied"})
    }
}