import loginLimiter from "../middleware/loginLimiter";
import { login, refresh, logout } from "../controllers/authController";
import { Router } from "express";


const router = Router();

router.route("/").post(loginLimiter, login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

export {router as authRouter};
