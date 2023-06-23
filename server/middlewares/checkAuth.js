 import jwt from "jsonwebtoken"

 export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, '')

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_CHIFFRE)
            req.userId = decoded.id 

            next()
        } catch (error) {
            return res.json({message: "access denied"})
        }
    } else {
        return res.json({message: "access denied"})
    }
 }