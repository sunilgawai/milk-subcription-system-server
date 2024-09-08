import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { CustomErrorHandler, Validate } from "../services";
import { db } from "../services/db";
import JwtService from "../services/JwtService";
import { APP_JWT_REFRESH_TOKEN_SECRET } from "../../config";

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    console.log("register body", req.body);
    // Validate request body
    const { error } = Validate.registorBodyValidator(req.body);
    if (error) {
      return next(error);
    }

    const {
      name,
      email,
      phoneNumber,
      telephoneNumber,
      address,
      password,
      confirmPassword,
    } = req.body;

    // Check if user already exists
    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      return next(new Error("User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        phoneNumber,
        telephoneNumber,
        address,
        password: hashedPassword,
      },
    });

    console.log("newUser", newUser);

    const access_token = JwtService.sign({
      id: newUser.id,
      email: newUser.email,
    });
    const refresh_token = JwtService.sign(
      { id: newUser.id, email: newUser.email },
      APP_JWT_REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    // Database whitelisting.
    // await db.user.update({
    //   where: { id: newUser.id },
    //   data: {
    //     refresh_token: refresh_token,
    //   },
    // });

    res.json({
      ...newUser,
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { error } = Validate.loginBodyValidator(req.body);
    if (error) {
      return next(error);
    }

    const { email, password } = req.body;

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(CustomErrorHandler.unAuthorized("Invalid credentials"));
    }

    const access_token = JwtService.sign({
      id: user.id,
      email: user.email,
    });

    const refresh_token = JwtService.sign(
      { id: user.id, email: user.email },
      APP_JWT_REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    const { refresh_token } = req.body;

    const user = await db.user.findUnique({ where: { refresh_token } });

    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    // await db.user.update({
    //   where: { id: user.id },
    //   data: {
    //     refresh_token: null,
    //   },
    // });

    res.send("Logout");
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
  //   const { email } = req.body;

  //   const user = await db.user.findUnique({ where: { email } });

  //   if (!user) {
  //     return next(CustomErrorHandler.notFound("User not found"));
  //   }

  //   const resetToken = JwtService.sign(
  //     { id: user.id, email: user.email },
  //     APP_JWT_REFRESH_TOKEN_SECRET!,
  //     { expiresIn: "1h" }
  //   );

  //   await db.user.update({
  //     where: { id: user.id },
  //     data: {
  //       reset_token: resetToken,
  //     },
  //   });

  //   const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  //   // Send email with reset password url
  //   // await sendEmail(email, resetPasswordUrl);
  //   // Send email with reset password url
  //   // TODO: Implement email sending functionality
  //   console.log('Reset password URL:', resetPasswordUrl);

  //   res.json({ message: "Password reset link sent to your email" });
  }

  // static async resetPassword(req: Request, res: Response, next: NextFunction) {
  //   const { token, newPassword } = req.body;

  //   if (!token || !newPassword) {
  //     return next(CustomErrorHandler.badRequest("Invalid input"));
  //   }

  //   let userId;
  //   try {
  //     const { id } = JwtService.verify(token, APP_JWT_REFRESH_TOKEN_SECRET!);
  //     userId = id;
  //   } catch (error) {
  //     return next(CustomErrorHandler.unauthorized("Invalid or expired token"));
  //   }

  //   const user = await db.user.findUnique({ where: { id: userId } });

  //   if (!user || user.reset_token !== token) {
  //     return next(CustomErrorHandler.unauthorized("Invalid or expired token"));
  //   }

  //   // Hash the new password
  //   const hashedPassword = await bcrypt.hash(newPassword, 10);

  //   // Update user's password and clear reset token
  //   await db.user.update({
  //     where: { id: userId },
  //     data: {
  //       password: hashedPassword,
  //       reset_token: null,
  //     },
  //   });

  //   res.json({ message: "Password has been reset successfully" });
  // }


  static async resetPassword(req: Request, res: Response) {
    res.send("Reset Password");
  }

  static async verifyEmail(req: Request, res: Response) {
    res.send("Verify Email");
  }

  static async resendVerificationEmail(req: Request, res: Response) {
    res.send("Resend Verification Email");
  }

  static async changePassword(req: Request, res: Response) {
    res.send("Change Password");
  }

  static async deleteAccount(req: Request, res: Response) {
    res.send("Delete Account");
  }

  static async getUser(req: Request, res: Response) {
    res.send("Get User");
  }

  static async updateUser(req: Request, res: Response) {
    res.send("Update User");
  }
}

export default AuthController;
