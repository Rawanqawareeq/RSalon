import { Router } from "express";
import { authorization, Role } from "../../middlewave/auth.js";
import * as couponController from "./coupn.controller.js";
import { validation } from "../../middlewave/validation.js";
import * as validationCoupon from "./coupon.validation.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router();
router.post('/',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.create),asyncHandler(couponController.create) );
router.get('/:id',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.get),asyncHandler(couponController.getDetails));
router.patch('/:id',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.update),asyncHandler(couponController.update));
router.patch('/delete/:id',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.remove),asyncHandler(couponController.remove));
router.get('/',authorization([Role.Admin,Role.SuperAdmin]),asyncHandler(couponController.get));

export default router;