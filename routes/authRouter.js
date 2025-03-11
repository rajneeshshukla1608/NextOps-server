import { Router } from "express";
import { login, signup } from "../controllers/user.js";


const router = Router()


router.post('/sign-up', signup)
router.post('/sign-in', login)


export default router