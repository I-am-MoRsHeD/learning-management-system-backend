import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateSchema } from "../../middlewares/validateSchema";
import { createModuleZodSchema, updateCourseZodSchema } from "./module.validation";
import { ModuleController } from "./module.controller";

const router = Router();


router.post('/create',
    checkAuth(Role.ADMIN),
    validateSchema(createModuleZodSchema),
    ModuleController.createModule);
router.patch('/:id',
    checkAuth(Role.ADMIN),
    validateSchema(updateCourseZodSchema),
    ModuleController.updateModule);
router.delete("/:id", checkAuth(Role.ADMIN), ModuleController.deleteModule);

export const ModuleRoutes = router;