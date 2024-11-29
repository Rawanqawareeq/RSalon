import { Router } from "express";
import fileUpload, { fileType } from "../../utls/mutler.js";
import { asyncHandler } from "../../utls/catchError.js";
import * as  reviewController from "./review.controller.js";
import { authorization, Role } from "../../middlewave/auth.js";

const router = Router();
router.post('/:serviceId',authorization([Role.Admin,Role.SuperAdmin,Role.User]),fileUpload(fileType.image).single('image'),asyncHandler(reviewController.create));
export default router;