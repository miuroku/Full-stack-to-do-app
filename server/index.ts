// load all configs.
// Load all env variables from '.env' file.
require('dotenv').config();
import * as settings from './src/config/index.config';
settings.loadConfigs();

// Needed imports.
import express from 'express';
import mongoose from 'mongoose';

// import Routes.
import homePageRouter from './src/routes/homePage.routes';
import usersRouter from './src/routes/users.routes';
import projectListRouter from './src/routes/projectList.routes';
import taskRouter from './src/routes/task.routes';
import authRouter from './src/routes/auth.routes';

import logger from './src/services/LoggerService/logger';

// import Middlewares
import cookieParser from 'cookie-parser';
import cors from 'cors';
import my_cors from './src/middlewares/my_cors';

// ----------

const app = express();  


// Imported Middlewares.
if (settings.useCors) app.use(cors(settings.corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(my_cors);
  
// Middleware Routers for our API requests.
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/home', homePageRouter);
app.use('/project-list', projectListRouter);
app.use('/task', taskRouter);


app.listen(settings.PORT, async () => {
    logger.info(`The application is listening on port ${settings.PORT}!`);

    try {
        const mongo = await mongoose.connect(settings.DATABASE_URL ?? 'some_invalid_db_url');

        logger.info(`Database is ready on url : ${settings.DATABASE_URL}`);
        logger.info(`Have fun !`);                

    } catch (e) {
        logger.error(`database connection failed. exiting now...`);
        logger.error(e);
        process.exit(1);
    }
});