import { Router } from "express";
import { authorization, Role } from "../../middlewave/auth.js";
import * as couponController from "./coupn.controller.js";
import { validation } from "../../middlewave/validation.js";
import * as validationCoupon from "./coupon.validation.js";

const router = Router();
router.post('/',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.create),couponController.create);
router.get('/:id',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.get),couponController.getDetails);
router.patch('/:id',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.update),couponController.update);
router.patch('/delete/:id',authorization([Role.Admin,Role.SuperAdmin]),validation(validationCoupon.remove),couponController.remove);
router.get('/',authorization([Role.Admin,Role.SuperAdmin]),couponController.get);

export default router;