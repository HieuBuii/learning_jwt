import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const checkPassword = (rawPassword, hashedPassword) => {
  return bcrypt.compareSync(rawPassword, hashedPassword);
};
