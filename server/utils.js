import { createConnection } from "mysql";

function executeQuery(query, values) {
    const connection = createConnection({
        host: "localhost",
        user: "root",
        password: "00000000",
        database: "thermopods",
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error("Error connecting to database:", err);
                reject(err);
                return;
            }
            console.log("Connected to MySQL database");
        });

        connection.query(query, values, (err, results, fields) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
                return;
            }
            console.log("Query executed successfully");

            connection.end((err) => {
                if (err) {
                    console.error("Error closing connection:", err);
                    reject(err);
                    return;
                }
                console.log("Connection closed");
                resolve({ results, fields });
            });
        });
    });
}

export default executeQuery;
