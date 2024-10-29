import { Router } from "express";
import fileUpload, { fileType } from "../../utls/mutler.js";
import { validation } from "../../middlewave/validation.js";
import  * as schema  from "./subcategory.validation.js";
import { authorization, Role } from "../../middlewave/auth.js";
import * as subcategoryController from "./subcategory.controller.js";
import { asyncHandler } from "../../utls/catchError.js";

const router = Router({mergeParams:true});
router.post('/',fileUpload(fileType.image).single('image'),validation(schema.creatSubCategorySchema),authorization([Role.Admin,Role.SuperAdmin]), asyncHandler(subcategoryController.createSubcategory));
router.patch('/updatecategory/:id',fileUpload(fileType.image).single('image'),validation(schema.updateSubCategorySchema),authorization([Role.Admin,Role.SuperAdmin]),asyncHandler(subcategoryController.updateSubCategory));
router.get('/',validation(schema.getAllSubCategorySchema),authorization([Role.Admin,Role.SuperAdmin]), asyncHandler(subcategoryController.getAll));
router.get('/getActive',validation(schema.getActiveSubCategorySchema),authorization([Role.Admin,Role.SuperAdmin,Role.User]), asyncHandler(subcategoryController.getActive));
router.get('/getDetails/:id',validation(schema.getDetailsSubCategorySchema),authorization([Role.Admin,Role.SuperAdmin]), asyncHandler(subcategoryController.getDetails));
router.patch('/:id',validation(schema.deleteSubCategorySchema),authorization([Role.Admin,Role.SuperAdmin]),asyncHandler(subcategoryController.deleteSubCategory));

export default router;