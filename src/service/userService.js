import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

//connect to db
const connectDB = async () => {
  let connection = null;
  try {
    // Create the connection to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      database: process.env.DB_NAME || "jwt",
      password: process.env.DB_PASSWORD,
    });
    console.log("Connect DB successfully");
  } catch (err) {
    console.log("Connect DB failed with ", err);
  } finally {
    return connection;
  }
};
//end

//hash fn
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

//end

export const handleCreateUser = async (body) => {
  const connection = await connectDB();
  const { email, password, userName } = body;
  const passwordHashed = hashPassword(password);
  try {
    const [results] = await connection.query(
      "INSERT INTO users (email, password, userName) VALUES(?, ?, ?)",
      [email, passwordHashed, userName]
    );
    console.log(results); // results contains rows returned by server
  } catch (err) {
    console.log(err);
  }
};
