// exports main class with all actions.

import * as argon2 from 'argon2'; // For hash passwords.
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import User from "../../../models/User.model";
import { IUser } from '../../../models/User.model';
import * as settings from '../../../config/index.config';
import * as TestService from './../../TestService/TestService';
import * as IAuthService from '../IAuthService';
import {Request, Response, RequestHandler} from 'express';
import logger from './../../LoggerService/logger';


// Makes all the logic (writes to DB, check if all the correct, etc)
export default class AuthService {
    constructor () {}        

    public static verifyAccessToken (token: string) {
        try {
            const decoded = jwt.verify(token, settings.auth.secret, settings.auth.decodeJWTOptions);
            return decoded;
        } catch (e) {
            throw new Error(`Access token was not verified`);
        }        
    }

    public static verifyRefreshToken (token: string) {
        try {
            const decoded = jwt.verify(token, settings.auth.secretForRefresh, settings.auth.decodeJWTOptions);            
            return decoded;
        } catch (e) {
            throw new Error(`Access token was not verified`);
        }        
    }

    // gets 'access_token' from 'Authorization' header. Example:
    // Authorization: Bearer iwejsf.sdfs.sdfs
    public static getTokenFromHeader (req) {    
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1]; 
        }    
        else {        
            throw new Error('Token not found or authorization header is invalid');        
        }
    }
    
    
    // gets 'refresh_token' from object in body of request. Example:
    // { "refresh_token": qwerty.qwerty.qwerty }
    public static getRefreshTokenFromHeader (req: Request): string {
        const refresh_token = req.body.refresh_token;        

        if (refresh_token) {                        
            return refresh_token;
        }            
    
        throw new Error(`Refresh token couldn't be found in body`);
    }

    public static getRefreshTokenFromCookies (req: Request): string {
        const cookies = req.cookies;        
        if ('__refresh_token__' in cookies) {            
            return cookies.__refresh_token__;
        } else {
            throw new Error(`Cookies does not contain "__refresh_token__" `);
        }
    }

    public static async Login (email: string, password: string): Promise<any> {

        const userRecord = await User.findOne({ email });
        if (!userRecord) {
            throw new Error("User not found");
        } else {
            // Using that function to prevent "Timing attacks".
            const correctPassword = await argon2.verify(userRecord.password, password);
            if (!correctPassword) throw new Error('Password is invalid');
        }        

        const token: string = this.generateJWT(userRecord);        
        const tokenRefresh: string = this.generateRefreshJWT(userRecord);        

        const returnedData: IAuthService.IDataSuccessReturned = {
            user: {
                name: userRecord.name,
                email: email
            },
            accessToken: token,
            refreshToken: tokenRefresh
        };

        return returnedData;
    }

    // Returns {user, token} or throws an Error.
    public static async Register (email: string, password: string, name: string): Promise<any> {

        // 1.1 check if email doesn't exists yet.
        const user = await User.findOne({email});
        if (user) throw new Error("User with this email is already exists !");

        // 1.2 check if password isn't too short.
        //if (password.length <= 5) throw new Error("Password must be at least 5 characters");

        // 1.3 check the length of name.
        if (!(name.length >= 2 && name.length <= 20)) throw new Error("Name length must be between 2 and 20, included")

        // 2. Hashing password.
        // The salt to protect the data against rainbow tables
        const salt = await randomBytes(32);
        const passwordHashed = await argon2.hash(password, {salt});

        // 3. writing User to DB.
        const userRecord = await User.create({
            email: email,
            password: passwordHashed,
            salt: salt.toString('hex'),
            name: name            
        });

        // 4. generate JWT access token.
        const token: string = this.generateJWT(userRecord);
        const tokenRefresh: string = this.generateRefreshJWT(userRecord);        

        // 5. Return value constructing.
        const returnedData: IAuthService.IDataSuccessReturned = {
            user: {
                name: name,
                email: email
            },
            accessToken: token,
            refreshToken: tokenRefresh
        };

        //TestService.printAllObject(returnedData);

        return returnedData;
    }
    
    public static generateJWT (user: IUser | IAuthService.IDataInsideJWT) {

        const dataToTransferInsideJWT: IAuthService.IDataInsideJWT = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        // Подпись секретная !
        const signature: string = settings.auth.secret;
        const expiration = settings.auth.expirationForAccessToken;

        // TO-DO: add 'keyid: ' later !!!
        const options: jwt.SignOptions = {
            expiresIn: expiration,
            algorithm: 'HS256',            
        };

        const result_jwt_string = jwt.sign(dataToTransferInsideJWT, signature, options);        
        return result_jwt_string;
    }

    private static generateRefreshJWT (user: IUser) {
        
        const dataToTransferInsideJWT: IAuthService.IDataInsideJWT = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        // Подпись секретная !
        const signature: string = settings.auth.secretForRefresh;
        const expiration = settings.auth.expirationForRefreshToken;

        // TO-DO: add 'keyid: ' later !!!
        const options: jwt.SignOptions = {
            expiresIn: expiration,
            algorithm: 'HS256',            
        };

        const result_jwt_string = jwt.sign(dataToTransferInsideJWT, signature, options);        
        return result_jwt_string;
    }
}