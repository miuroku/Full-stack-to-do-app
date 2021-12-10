import jwt from 'jsonwebtoken';
import {Request, Response, RequestHandler} from 'express';
import * as settings from '../../config/index.config';
import logger from '../../services/LoggerService/logger';
import isAuthJWT from './JWT/isAuthJWT';
import isAuthSession from './Session/isAuthSession';

// Depends on using 'JWT' or 'Session' settings seted.
const isAuth = settings.auth.authType === settings.auth.authTypeEnum.JWT ? isAuthJWT : isAuthSession;

export default isAuth;





