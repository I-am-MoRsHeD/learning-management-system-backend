/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notfound';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Learning Management System!!');
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;