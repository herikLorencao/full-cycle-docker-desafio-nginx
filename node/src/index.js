import express from "express";
import mysql from 'mysql';
import { faker } from "@faker-js/faker";

const app = express();
const port = 3000;

const database = {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'nodedb'
};

app.get("/", (_, res) => {
    faker.locale = 'pt_BR'
    const peopleName = faker.name.fullName();
    
    const connection = mysql.createConnection(database);
    const createTableScript = `
        CREATE TABLE IF NOT EXISTS nodedb.people(
            id INTEGER AUTO_INCREMENT NOT NULL,
            name VARCHAR(255) NOT NULL,
    
            CONSTRAINT pk_people
                PRIMARY KEY (id)
        )`;
    const insertSql = `INSERT INTO people(name) VALUES ('${peopleName}')`;

    connection.query(createTableScript);
    connection.query(insertSql);

    const header = "<h1>Full Cycle Rocks!</h1>";

    connection.query(`SELECT * FROM nodedb.people`, (error, peoples, _) => {
        if (error) throw error;
        res.send(`
            ${header}
            <ul>
                ${!!peoples ? peoples.map(people => `<li>${people.name}</li>`).join('') : ''}
            </ul>
        `);
    })
    connection.end();
});

app.listen(port, () => {
    console.log("Rodando na porta " + port);
});
