import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { authorization, Role } from "../../middlewave/auth.js";

const router = Router();
router.get('/',authorization([Role.SuperAdmin,Role.Admin,Role.User]),cartController.getCart);
router.post('/',authorization([Role.SuperAdmin,Role.Admin,Role.User]),cartController.createCart);
router.patch('/:serviceId',authorization([Role.SuperAdmin,Role.Admin,Role.User]),cartController.removeService);
router.patch('/',authorization([Role.SuperAdmin,Role.Admin,Role.User]),cartController.removeAll);
export default router;