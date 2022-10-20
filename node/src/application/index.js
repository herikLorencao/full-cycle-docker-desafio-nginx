import { PeopleRepository } from "../infra/people-repository";

import express from "express";
import faker from "faker-js";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
    const peopleRepository = new PeopleRepository();
    const header = "<h1>Full Cycle Rocks!</h1>";

    const peopleName = faker.name.fullName();
    peopleRepository.insert(peopleName);

    const peoples = peopleRepository.list();

    let body = "<ul>";

    peoples.forEach((people) => {
        body += `${people.name}`;
    });

    body = "</ul>";

    res.send(`${header} ${body}`);
});

app.listen(port, () => {
    console.log("Rodando na porta " + port);
});
