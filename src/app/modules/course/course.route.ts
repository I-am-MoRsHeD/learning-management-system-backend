import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateSchema } from "../../middlewares/validateSchema";
import { createCourseZodSchema, updateCourseZodSchema } from "./course.validation";
import { CourseController } from "./course.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get("/", checkAuth(...Object.values(Role)), CourseController.getAllCourses);
router.post('/create',
    checkAuth(Role.ADMIN),
    multerUpload.single("file"),
    validateSchema(createCourseZodSchema),
    CourseController.createCourse);
router.patch(
    "/:id",
    checkAuth(Role.ADMIN),
    multerUpload.single("file"),
    validateSchema(updateCourseZodSchema),
    CourseController.updateCourse
);
router.delete("/:id", checkAuth(Role.ADMIN), CourseController.deleteCourse);

export const courseRoutes = router;