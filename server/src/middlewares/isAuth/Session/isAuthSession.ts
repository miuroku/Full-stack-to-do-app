import * as settings from './../../../config/index.config';
import logger from '../../../services/LoggerService/logger';
import {Request, Response, RequestHandler} from 'express';


const EasySession = (req, res: Response, next: any) => {

};

const HardSession = (req, res: Response, next: any) => {

};

// depends on 'Hard' or 'Easy' session is selected in the settings.
const isAuth = settings.auth.authComplexity == settings.auth.authСomplexityEnum.Easy ? EasySession : HardSession;

export default isAuth;
