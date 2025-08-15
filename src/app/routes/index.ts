import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { courseRoutes } from "../modules/course/course.route";
import { ModuleRoutes } from "../modules/module/module.route";
import { lectureRoutes } from "../modules/lecture/lecture.route";

export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/course',
        route: courseRoutes
    },
    {
        path: '/module',
        route: ModuleRoutes
    },
    {
        path: '/lecture',
        route: lectureRoutes
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})