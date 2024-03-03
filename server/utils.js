import { createConnection } from "mysql";

function executeQuery(query) {
    const connection = createConnection({
        host: "localhost", // Replace 'localhost' with your MySQL host
        user: "root", // Replace 'your_username' with your MySQL username
        password: "00000000", // Replace 'your_password' with your MySQL password
        database: "mysql", // Replace 'your_database' with your MySQL database name
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to database:", err);
            return;
        }
        console.log("Connected to MySQL database");
    });

    results = [];
    fields = [];

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error("Error executing query:", err);
            return;
        }
        console.log("Query executed successfully");
        results = results;
        fields = fields;
    });

    connection.end((err) => {
        if (err) {
            console.error("Error closing connection:", err);
            return;
        }
        console.log("Connection closed");
    });

    return { results, fields };
}
