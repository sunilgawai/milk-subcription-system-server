import Router from "express";
import { AuthController } from "../controllers";

const authRoutes = Router();

authRoutes.post("/register", AuthController.register);

authRoutes.post("/login", AuthController.login);

authRoutes.post("/logout", AuthController.logout);

authRoutes.post("/me", AuthController.getUser);

authRoutes.post("/forgot-password", AuthController.forgotPassword);

authRoutes.post("/reset-password", AuthController.resetPassword);

authRoutes.post("/change-password", AuthController.changePassword);

authRoutes.delete("/delete-account", AuthController.deleteAccount);

authRoutes.post("/verify-email", AuthController.verifyEmail);

authRoutes.post("/resend-verification-email", AuthController.resendVerificationEmail);


export default authRoutes;