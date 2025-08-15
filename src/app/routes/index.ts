import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { courseRoutes } from "../modules/course/course.route";
import { ModuleRoutes } from "../modules/module/module.route";

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
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})