import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { authorization, Role } from "../../middlewave/auth.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router();
router.get('/',authorization([Role.SuperAdmin,Role.Admin,Role.User]),asyncHandler(cartController.getCart) );
router.post('/',authorization([Role.SuperAdmin,Role.Admin,Role.User]),asyncHandler(cartController.createCart));
router.patch('/:serviceId',authorization([Role.SuperAdmin,Role.Admin,Role.User]),asyncHandler(cartController.removeService));
router.patch('/',authorization([Role.SuperAdmin,Role.Admin,Role.User]),asyncHandler(cartController.removeAll));
export default router;