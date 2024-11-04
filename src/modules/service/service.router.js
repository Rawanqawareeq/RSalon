import { Router } from "express";
import { authorization, Role } from "../../middlewave/auth.js";
import * as serviceController from "./service.controller.js";
import fileUpload, { fileType } from "../../utls/mutler.js";
import { validation } from "../../middlewave/validation.js";
import * as schema  from "./service.validation.js";

const router =Router();
router.post('/',fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImage',maxCount:5},
]),validation(schema.createSchema),authorization([Role.Admin,Role.SuperAdmin]),serviceController.create);
router.patch('/update/:id',fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImage',maxCount:5},
]),validation(schema.updateSchema),authorization([Role.Admin,Role.SuperAdmin]),serviceController.update);
router.get('/getAll',authorization([Role.Admin,Role.SuperAdmin]),serviceController.getAll);
router.get('/',authorization([Role.Admin,Role.SuperAdmin,Role.User]),serviceController.getActive);
router.get('/getdetails/:id',validation(schema.detailsSchema),authorization([Role.Admin,Role.SuperAdmin,Role.User]),serviceController.getDetails);
router.patch('/:id',validation(schema.deleteSchema),authorization([Role.Admin,Role.SuperAdmin,Role.User]),serviceController.remove);
export default router;