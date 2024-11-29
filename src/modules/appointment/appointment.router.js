import { Router } from "express";
import * as appointmentController from "./appointment.controller.js";
import { asyncHandler } from "../../utls/catchError.js";
import { authorization, Role } from "../../middlewave/auth.js";

const router = Router();
router.post('/',authorization([Role.Admin,Role.SuperAdmin,Role.User]),asyncHandler(appointmentController.create) );
router.get('/',authorization([Role.Admin,Role.SuperAdmin]),asyncHandler(appointmentController.getAllAdmin) );
router.get('/user',authorization([Role.Admin,Role.SuperAdmin,Role.User]),asyncHandler(appointmentController.getAllUser ) );
router.patch('/:id',authorization([Role.Admin,Role.SuperAdmin]),asyncHandler(appointmentController.updateappointments));
export default router;