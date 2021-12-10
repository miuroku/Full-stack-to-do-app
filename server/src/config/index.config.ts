
// The function that will load some configs.
export const loadConfigs = () => {    
    
}

// Settings for 'cors(corsOptions)' middleware from 'cors' module.
export let whiteList = ["http://localhost:3000", "http://localhost:8080", "http://localhost"];
//["http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:3000", "http://127.0.0.1:8080", "http://localhost", "http://127.0.0.1"]
export let corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:3000", "http://127.0.0.1:8080", "http://localhost", "http://127.0.0.1"]
};

export const useCors = false;

// Loading .env variables.
// Application & database ports:
export const PORT = process.env.PORT || 8080;
export const DATABASE_URL = process.env.DATABASE_URL;

export * as auth from './auth.config';

