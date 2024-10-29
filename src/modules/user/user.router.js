import { Router } from "express";
import * as UserController from "./user.controller.js";
import { authorization, Role } from "../../middlewave/auth.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./user.validation.js";
import fileUpload, { fileType } from "../../utls/mutler.js";

const router = Router();
router.post('/',fileUpload(fileType.image).single('image'),validation(schema.addUserSchema),authorization(Role.SuperAdmin,Role.Admin),asyncHandler(UserController.addUser));
router.patch('/updateuser/:id',fileUpload(fileType.image).single('image'),validation(schema.updateUserSchema),authorization(Role.SuperAdmin,Role.Admin),asyncHandler(UserController.UpdateUser));
router.get('/getAll',authorization(Role.SuperAdmin),asyncHandler(UserController.getAll));
router.get('/',authorization(Role.SuperAdmin,Role.Admin),asyncHandler(UserController.getActive));
router.get('/:id',validation(schema.userDetails),authorization(Role.SuperAdmin,Role.Admin),asyncHandler(UserController.userDetails));
router.patch('/:id',validation(schema.deleteUserSchema),authorization(Role.SuperAdmin,Role.Admin),asyncHandler(UserController.removeUser));
export default router;