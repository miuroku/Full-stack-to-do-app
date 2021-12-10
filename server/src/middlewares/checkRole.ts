import { Request, Response } from 'express';
import logger from '../services/LoggerService/logger';
import User, { userRole } from "../models/User.model";


// Function for comparing roles.
function roleToNum(role: string): number {
    if (role === userRole.common) return 1;
    if (role === userRole.moderator) return 2;
    if (role === userRole.admin) return 3;
    return 1;
}

// Use that middleware after 'isAuth' !
// Uses 'req.userDecoded'.
export default function checkRole (requiredRole: string) {

    logger.debug(`insode checkRole 1     --- par = ${requiredRole}`);
    return async function checkRoleMiddleware (req, res: Response, next) {
        
        logger.debug('Inside checkRole 2');
        try {
            // 1. getting user from DB according to 'req.userDecoded._id'.
            const userRecord = await User.findOne({_id: req.userDecoded._id});
            if (!userRecord) {
                const error_mes = "User not found i do not know why :(";
                return res.json({message: error_mes}).status(401).end();
            }

            // 2, Check his role.
            if (roleToNum(userRecord.role) < roleToNum(requiredRole)) {
                return res.json({message: "Such user have no required priviliges"}).status(401).end();
            } else {
                // User meet required role, going to next middleware.
                logger.debug('- Admin Role is verified !')
                return next();
            }
        } catch (e) {
            return res.json({message: (e as Error).message}).status(500).end();
        }
    }
}

// TO-DO: great idea to make a function that according to string parameter 
//      returns a number for current role !   
// function roleToNumber(role: string) {
//      if (role === "commmonUser") return 1;
//      if (role === "adminUser") return 2;
//}
//      And further compare roles like if (roleToNumber(user_1) >= roleToNumber(user_2)) do smth ...
// END TO-DO.


// NOTE.
// For all admin operations make special paths. 
// like: 'admin/project-list/get-one/:id'