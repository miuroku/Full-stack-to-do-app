import {Request, Response, RequestHandler} from 'express';

const ALLOWED_ORIGINS = [
    'http://home.com',
    'http://127.0.0.1:8000',
    'http://localhost:3000'
]

// Just adds all neccessary CORS headers to response.
export default async function my_cors (req: Request, res: Response, next: any) {            
    const resourceOrigin = req.headers.origin;

    // Если источник из белого списка 
    // то мы разрешаем использовать данные аутентификации
    if(ALLOWED_ORIGINS.indexOf(resourceOrigin) > -1) {
        res.set({
            'Access-Control-Allow-Origin': `${resourceOrigin}`,
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authentication, withcredentials, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        });
    } else {
        res.set({
            'Access-Control-Allow-Origin': `*`
        });
    }

    return next();
}