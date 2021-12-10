import express from "express";
import logger from './../services/LoggerService/logger';
import * as settings from './../config/index.config';
import {Request, Response, RequestHandler} from 'express';
import AuthServiceJWT from "../services/AuthService/AuthServiceJWT/AuthServiceJWT";
import * as IAuthService from "./../services/AuthService/IAuthService";
import { JwtPayload } from "jsonwebtoken";

const router = express.Router();


// Main routes.

// Depends on type of auth.
// To-DO: Сделать не так, выбирать логику должен сам 
// сервис который юзает этот API, 
// типо в этом же и есть смысл использования именно токенов, лол !!!

//if (settings.auth.authType === settings.auth.authTypeEnum.JWT)

// Returns new 'access_token' using 'refresh_token' from request body.
router.post('/access-token', (req: Request, res: Response) => {
    try {
        const ourRefreshToken = AuthServiceJWT.getRefreshTokenFromHeader(req);
        const decodedFromToken_string = AuthServiceJWT.verifyRefreshToken(ourRefreshToken);
        let decodedFromToken: string|JwtPayload|IAuthService.IDataInsideRefreshJwt;
        if (typeof decodedFromToken_string === 'string') {
            decodedFromToken = JSON.parse(decodedFromToken_string);                        
        } else {
            decodedFromToken = decodedFromToken_string;
        }

        // Construct data to pass inside JWT.
        const userNeededData: IAuthService.IDataInsideJWT = {
            _id: (decodedFromToken as IAuthService.IDataInsideRefreshJwt)._id,
            name: (decodedFromToken as IAuthService.IDataInsideRefreshJwt).name,
            email: (decodedFromToken as IAuthService.IDataInsideRefreshJwt).email
        }

        const ourNewAccessToken = AuthServiceJWT.generateJWT(userNeededData);

        const result = {
            access_token: ourNewAccessToken
        }

        return res.json(result).status(200).end();
    } catch (e) {
        logger.error(`${(e as Error).message}`);
        return res.json({message: (e as Error).message}).status(500).end();
    }
});


// Returns new 'access_token' using 'refresh_token' from cookies.
router.post('/access-token-cookies', (req: Request, res: Response) => {    
    try {
        const ourRefreshToken = AuthServiceJWT.getRefreshTokenFromCookies(req);
        //logger.info(`2. our refresh token : ${ourRefreshToken}`);
        const decodedFromToken_string = AuthServiceJWT.verifyRefreshToken(ourRefreshToken);
        //logger.info(`3. decoded from refresh token : ${decodedFromToken_string}`);
        let decodedFromToken: string|JwtPayload|IAuthService.IDataInsideRefreshJwt;
        if (typeof decodedFromToken_string === 'string') {
            decodedFromToken = JSON.parse(decodedFromToken_string);                        
        } else {
            decodedFromToken = decodedFromToken_string;
        }

        // Construct data to pass inside JWT.
        const userNeededData: IAuthService.IDataInsideJWT = {
            _id: (decodedFromToken as IAuthService.IDataInsideRefreshJwt)._id,
            name: (decodedFromToken as IAuthService.IDataInsideRefreshJwt).name,
            email: (decodedFromToken as IAuthService.IDataInsideRefreshJwt).email
        }

        const ourNewAccessToken = AuthServiceJWT.generateJWT(userNeededData);
        //logger.info(`4. new access token : ${ourNewAccessToken}`);

        const result = {
            user: {
                name: userNeededData.name,
                email: userNeededData.email
            },
            access_token: ourNewAccessToken,
            expires_in: settings.auth.expirationForAccessTokenNumber
        }

        //logger.info(`5. result : ${result.access_token}`);
        return res.json(result).status(200).end();
    } catch (e) {
        //logger.info(`${(e as Error).message}`);
        return res.json({message: (e as Error).message}).status(500).end();
    }
});

router.post('/logout-cookie', (req: Request, res: Response) => {
    try {

        res.clearCookie(settings.auth.refreshTokenInCookiesName).status(200).end();
    } catch (e) {
        return res.json({message: (e as Error).message}).status(500).end();   
    }
});


// Not needed, cuz we could just logout and login again when refresh_token expired.

// router.post('/refresh-token', (req, res) => {

//     res.cookie('_refresh_token_2_', 'coookie BITCH', {
//         maxAge:1000 * 60 * 15, 
//         httpOnly: true,        
//     });

//     res.clearCookie('_refresh_token_');
//     res.send();
// });


export default router;