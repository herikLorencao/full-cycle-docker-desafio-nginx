import { connection } from "./database";

export class PeopleRepository {
    constructor() {
        this.connection = connection;
    }

    list() {
        const sql = `SELECT name from people`;
        this.connection.query(sql, (error, results, _) => {
            if (error) throw error;
            return results;
        });
    }

    insert(name) {
        const sql = `INSERT INTO people(name) VALUES (${name})`;
        this.connection.query(sql);
        this.connection.end();
    }
}
