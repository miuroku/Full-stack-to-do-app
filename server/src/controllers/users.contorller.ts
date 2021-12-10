import express from 'express';
import { Request, Response } from 'express';

import logger from '../services/LoggerService/logger';
import User from '../models/User.model';
import AuthService from '../services/AuthService/AuthService';
import * as TestService from '../services/TestService/TestService';
import * as IAuthService from '../services/AuthService/IAuthService';
import * as settings from './../config/index.config';

export async function registerUser (req: Request, res: Response) {

    try {
        // 1. Getting neccessary data from request.        
        const { name, email, password } = req.body.user;
        logger.info(`name = ${name}, email=${email}, pass=${password}`);
        TestService.printAllObject(req.body);

        // Creating new user, hash password, save to DB. 
        const userAndToken: IAuthService.IDataSuccessReturned = await (AuthService as any).Register(email, password, name);        

        return res.json(userAndToken).status(200).end();
    } catch (e) {        
        logger.error(`${(e as Error).message}`);
        return res.json({message: (e as Error).message}).status(500).end();
    }
}

export async function loginUser (req: Request, res: Response) {
     
    const { email, password } = req.body.user;
    try {
        const userAndToken: IAuthService.IDataSuccessReturned = await (AuthService as any).Login(email, password);        
        return res.json(userAndToken).status(200).end();
    } catch (e) {
        logger.error(`${(e as Error).message}`);
        return res.json({message: (e as Error).message}).status(500).end();
    }
}

// It uses cookies.
export async function loginUserForBrowser (req: Request, res: Response) {
     
    const { email, password } = req.body.user;
    try {
        const userAndToken: IAuthService.IDataSuccessReturned = await (AuthService as any).Login(email, password);

        res.cookie('__refresh_token__', `${userAndToken.refreshToken}`, {
            httpOnly: true,
            path: "/",
            expires: settings.auth.getExpiresDateForRefreshCookie()
        });

        const result = {
            user: userAndToken.user,
            access_token: userAndToken.accessToken
        }
        return res.json(result).status(200).end();
    } catch (e) {
        logger.error(`${(e as Error).message}`);
        return res.json({message: (e as Error).message}).status(500).end();
    }
}

export async function registerUserForBrowser (req: Request, res: Response) {

    try {
        // 1. Getting neccessary data from request.        
        const { name, email, password } = req.body.user;
        //logger.info(`name = ${name}, email=${email}, pass=${password}`);
        //TestService.printAllObject(req.body);

        // Creating new user, hash password, save to DB. 
        const userAndToken: IAuthService.IDataSuccessReturned = await (AuthService as any).Register(email, password, name);        

        res.cookie('__refresh_token__', `${userAndToken.refreshToken}`, {
            httpOnly: true,
            path: "/",
            expires: settings.auth.getExpiresDateForRefreshCookie()
        });

        const result = {
            user: userAndToken.user,
            access_token: userAndToken.accessToken
        }
        
        return res.json(result).status(200).end();
    } catch (e) {        
        logger.error(`${(e as Error).message}`);
        return res.json({message: (e as Error).message}).status(500).end();
    }
}

// TESTING STUFF. -------------------------

export async function getUsers (req: Request, res: Response) {
    const some_document_returned = await User.find();
    res.json(some_document_returned);
}

export async function insertUser (req: Request, res: Response) {
    const some_new_user = {
        email: "my_email",
        name: "my_name",
        password: "my_password",
        salt: "my_salt",
    };

    const new_user_instance = new User(some_new_user);
    new_user_instance.save();

    res.send('User was created !');
}

export async function getUser (req: Request, res: Response) {
    return res.json({message: "Youare good "}).status(200).end();
}