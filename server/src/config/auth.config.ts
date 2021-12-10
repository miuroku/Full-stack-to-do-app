import jwt from 'jsonwebtoken';

// Temp secret.
// TO-DO: add 'kid' in tokens add load all secrets from DB once an app started, change them one time for a month. Calculate 'kid' depends on 'email' or '_id' from user.
export const secret: string = process.env.SECRET_JWT || "default_secret_1";
export const secretForRefresh: string = process.env.SECRET_JWT_REFRESH || "default_secret_2";

// JWT tokens expiration.
export const expirationForAccessToken: string = `${15 * 60 * 1000}ms`; // 15 min.
export const expirationForRefreshToken: string = `${30 * 24 * 60 * 60 * 1000}ms`; // 30 days.

export const expirationForAccessTokenNumber: number = 15 * 60 * 1000;
export const expirationForRefreshTokenNumber: number = 30 * 24 * 60 * 60 * 1000;

// Returns Date.
export const getExpiresDateForRefreshCookie  = () => {
    const future = new Date();
    future.setTime(future.getTime() + expirationForRefreshTokenNumber);
    return future;
}

// Authorization methods/variants.
export enum authTypeEnum {
    "JWT",
    "Sessions"
}
export enum authСomplexityEnum {
    "Easy",
    "Hard"
}

export const authType = authTypeEnum.JWT;
export const authComplexity = authСomplexityEnum.Easy;

export const decodeJWTOptions: jwt.VerifyOptions = {
    algorithms: ["HS256"],            
};


export const refreshTokenInCookiesName = "__refresh_token__";