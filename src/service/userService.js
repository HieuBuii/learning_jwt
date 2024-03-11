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

export const getListUser = async (req, res) => {
  const connection = await connectDB();
  let data = [];
  try {
    const [results] = await connection.query("SELECT * FROM users");
    data = results;
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const handleCreateUser = async (body) => {
  const connection = await connectDB();
  const { email, password, userName } = body;
  const passwordHashed = hashPassword(password);
  try {
    await connection.query(
      "INSERT INTO users (email, password, userName) VALUES(?, ?, ?)",
      [email, passwordHashed, userName]
    );
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteUser = async (id) => {
  const connection = await connectDB();
  try {
    await connection.query("DELETE FROM users WHERE id = ?", [id]);
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (id) => {
  const connection = await connectDB();
  let userData = {};
  try {
    const [results] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (results && results.length > 0) userData = results[0];
  } catch (err) {
    console.log(err);
  }
  return userData;
};

export const handleUpdateUser = async (body) => {
  const connection = await connectDB();
  const { email, id, userName } = body;
  try {
    await connection.query(
      "UPDATE users SET email = ?, userName = ? WHERE id = ?",
      [email, userName, id]
    );
  } catch (err) {
    console.log(err);
  }
};
