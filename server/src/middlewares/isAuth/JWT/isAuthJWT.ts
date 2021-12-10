import jwt from 'jsonwebtoken';
import * as settings from './../../../config/index.config';
import logger from '../../../services/LoggerService/logger';
import {Request, Response, RequestHandler} from 'express';
import AuthService from './../../../services/AuthService/AuthServiceJWT/AuthServiceJWT';


const getTokenFromHeader = AuthService.getTokenFromHeader;
const getRefreshTokenFromHeader = AuthService.getRefreshTokenFromHeader;


// Example of decoded user.
// {   "_id": "61b190fd0f98ee92dcf51ba5",
//     "name": "Some_name",
//     "email": "some_email@gmail.com",
//     "iat": 1639122069,
//     "exp": 1639122969
// }

// If correct adds decoded user data to 'req.userDecoded'
export default async function isAuth (req, res: Response, next: any) {

    // 1. Trying to get a token.
    let token: string = "";
    let refreshToken: string = "";
    try {
        token = getTokenFromHeader(req);             
        //refreshToken = getRefreshTokenFromHeader(req);        
    } catch (e) {
        return res.status(403).json({message: (e as Error).message}).end();
    }    

    // 2. Verify token.
    try {
        const decoded = jwt.verify(token, settings.auth.secret, settings.auth.decodeJWTOptions);
        //const decodedRefresh = jwt.verify(refreshToken, settings.auth.secretForRefresh, decodeJWTOptions);
        req.userDecoded = decoded;
        logger.debug("- JWT is verifed and all is OK !");
        //logger.info(`Your decoded user : ${JSON.stringify(decoded, null, 4)}`);
        return next();
    } catch (e) {
        return res.status(401).json({message: (e as Error).message}).end();
    }
}


export const HardJWT = () => {

};

export const EasyJWT = () => {

};