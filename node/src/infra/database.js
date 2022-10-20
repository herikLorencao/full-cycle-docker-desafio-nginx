import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

const connection = mysql.createConnection(config);
export { connection };
