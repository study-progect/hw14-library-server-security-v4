import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
export const PORT = 3500;
export const db = 'mongodb+srv://kkurochkin1111:nOcc4z2kEJB7g20q@cluster0.ngcnzbs.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0'

dotenv.config()
export const pool = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT? +process.env.DB_PORT : undefined,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})
