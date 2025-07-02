import dotenv from 'dotenv'

dotenv.config()


export const PORT = process.env.PORT || 3000
export const HOST = process.env.HOST || "localhost"
export const DB_CON = process.env.DB_CON
export const ACCESSTOKEN = process.env.JWT_ACCESS_KEY
export const REFRESHTOKEN = process.env.JWT_REFRESH_KEY

if(!DB_CON||!ACCESSTOKEN||!REFRESHTOKEN){
    throw new Error("Missing JWT_SECRET. Exiting...");
}
