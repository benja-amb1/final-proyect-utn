import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import limiter from "../middlewares/ratelimit.middleware";

const router = Router();

router.post('/register', limiter, UserController.register);
router.post('/login', limiter, UserController.login);
router.post('/logout', AuthMiddleware, UserController.logout)
router.get('/session', AuthMiddleware, UserController.getSession);

export default router