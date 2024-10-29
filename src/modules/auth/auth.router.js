import { Router } from "express";
import * as authController from "./auth.controller.js";
import { checkEmail } from "../../middlewave/checkEmail.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import  * as schema from "./auth.validation.js";
import { authorization, Role } from "../../middlewave/auth.js";

const router = Router();
router.post('/',validation(schema.registerSchema),checkEmail,asyncHandler(authController.register));
router.post('/login',validation(schema.loginSchema),asyncHandler(authController.login));
router.patch('/sendCode',validation(schema.sendCodeSchema),asyncHandler(authController.sendCode));
router.patch('/forgetPassword',validation(schema.forgetPasswordSchema),asyncHandler(authController.forgetPassword));
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));
export default router;