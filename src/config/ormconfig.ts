import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const portString = process.env.DB_PORT;
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = portString ? parseInt(portString) : 3306;

const MySQLDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: port,
    username: userName,
    password: password,
    database: database,
    synchronize: true,
    logging: true,
    entities: [],
    migrations: ["./src/migrations/*.ts"],
});

export default MySQLDataSource;
