import db from "../models";
import { Op } from "sequelize";

export const findUser = async (data) => {
  const user = await db.User.findOne({
    where: {
      [Op.or]: data,
    },
  });
  return user;
};
