import { Router } from "express"
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments } from "../controllers/posts.js"
import { checkAuth } from "../middlewares/checkAuth.js"

const router = new Router()

// Create post
router.post('/',checkAuth, createPost)

// Get all posts
router.get('/', getAll)

// Get post by id
router.get('/:id', getById)

// Get user's posts
router.get('/user/me', checkAuth, getMyPosts)

// Remove post
router.delete('/:id', checkAuth, removePost)

// update post
router.put('/:id', checkAuth, updatePost)

// Get Post Comments
router.get('/comments/:id', getPostComments)

export default router