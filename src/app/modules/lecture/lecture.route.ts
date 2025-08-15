import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateSchema } from "../../middlewares/validateSchema";
import { createLectureZodSchema, updateLectureZodSchema } from "./lecture.validation";
import { LectureController } from "./lecture.controller";
import { multerUpload } from "../../config/multer.config";


const router = Router();

router.post('/create',
    checkAuth(Role.ADMIN),
    multerUpload.array('files'),
    validateSchema(createLectureZodSchema),
    LectureController.createLecture);

router.patch('/:id',
    checkAuth(Role.ADMIN),
    multerUpload.array('files'),
    validateSchema(updateLectureZodSchema),
    LectureController.updateLecture);

router.delete("/:id", checkAuth(Role.ADMIN), LectureController.deleteLecture);

export const lectureRoutes = router;