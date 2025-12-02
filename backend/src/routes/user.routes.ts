import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', AuthMiddleware, UserController.logout)
router.get('/session', AuthMiddleware, UserController.getSession);

export default router