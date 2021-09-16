import * as dotenv from 'dotenv';

dotenv.config();

// Front end settings
export const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://localhost:8080/";
export const JWT_SECRET = process.env.REACT_APP_JWT_SECRET ? process.env.REACT_APP_JWT_SECRET : "test12345";
