import { Router } from "express";
import { authorization, Role } from "../../middlewave/auth.js";
import * as categoryController from "./category.controller.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./category.validation.js";
import fileUpload, { fileType } from "../../utls/mutler.js";
import subCategoryRouter from "../subCategory/subcategory.router.js";
import { asyncHandler } from "../../utls/catchError.js";
const router = Router({caseSensitive:true});
router.use('/:categoryId/subcategory',subCategoryRouter);

router.post('/',fileUpload(fileType.image).single('image'),validation(schema.createCategorySchema),authorization([Role.SuperAdmin,Role.Admin]),asyncHandler(categoryController.createCategory) );
router.patch('/updatecategory/:id',fileUpload(fileType.image).single('image'),validation(schema.updateCategorySchema),authorization([Role.SuperAdmin,Role.Admin]),asyncHandler(categoryController.updateCategory));
router.get('/getAll',authorization([Role.SuperAdmin,Role.Admin]),asyncHandler(categoryController.getCategory));
router.get('/getActive',authorization([Role.SuperAdmin,Role.Admin,Role.User]),asyncHandler(categoryController.getActiveCategory));
router.get('/getdetails/:id',validation(schema.getCategorySchema),authorization([Role.SuperAdmin,Role.Admin,Role.User]),asyncHandler(categoryController.getDetailsCategory));
router.patch('/:id',validation(schema.deleteCategory),authorization([Role.SuperAdmin,Role.Admin,Role.User]),asyncHandler(categoryController.deleteCategory));

export default router;