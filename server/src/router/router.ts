import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { AuthController } from "../controllers/authController"

export const router = Router()

const userController = new UserController()
const authController = new AuthController()

//user
router.post('/create', userController.create)
router.get('/user/:id', userController.getUser)
router.delete('/user/:id', userController.delete)
router.put('/user/:id', userController.update)
//auth
router.post('/auth', authController.authenticate)