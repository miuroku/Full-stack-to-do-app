import express from "express";

// Controllers import.
import { getUser, getUsers, insertUser, loginUser, registerUser, loginUserForBrowser, registerUserForBrowser } from "../controllers/users.contorller";
import checkRole from "../middlewares/checkRole";
import isAuth from "../middlewares/isAuth/isAuth";
import { userRole } from "../models/User.model";
import * as settings from './../config/index.config';


const router = express.Router();


// Main Routers.

// After registration user logins automatically
// That means there are no any email verification
// mehanism, so, if you are afraid about bots and endless 
// of accounts, verify email by sending a link 
router.post('/register', registerUser); 
router.post('/login', loginUser);

// I'm not sure if that neccessary, but now
// I don't know other solution if the purpose is 
// have possibility to use that server as microservice AND as browser server.

// So, it uses cookies.
router.post('/register-cookies', registerUserForBrowser);
router.post('/login-cookies', loginUserForBrowser);

// TESTING STUFF ---------------------------------------

router.get('/get-users', isAuth, checkRole(userRole.admin), getUsers);

router.post('/insert-user', insertUser); // POST http://localhost:3000/insert-user

router.get('/get-user', isAuth, getUser); // GET http://localhost:3000/get-user/6172143047e6832b60af0c59


export default router;