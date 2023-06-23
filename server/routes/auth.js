import { Router } from "express"
import { register, login, getUser } from "../controllers/auth.js"
import { checkAuth } from "../middlewares/checkAuth.js"

const router = new Router()

// Regisration
router.post('/registration', register)

// Login 
router.post('/login', login)

// Get user
router.get('/user', checkAuth, getUser)

export default router