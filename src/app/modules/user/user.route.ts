import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { createUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";


const router = Router();

router.post('/register', validateSchema(createUserZodSchema), UserController.createUser);
router.post('/login', UserController.credentialsLogin);
router.post('/logout', UserController.logout);

export const userRoutes = router;