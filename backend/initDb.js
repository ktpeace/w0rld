import fs from "fs";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

fs.readFile("dbSetup.sql", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading SQL file:", err);
    return;
  }

  const queries = data.split(";");
  queries.pop(); // Remove the last empty element

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }

    queries.forEach((query) => {
      connection.query(query, (err) => {
        if (err) {
          console.error("Error executing query:", err);
        }
      });
    });

    console.log("Tables created successfully");
    connection.end();
  });
});
