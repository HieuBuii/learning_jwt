import dotenv from "dotenv";
import db from "../models";
dotenv.config();
import * as handleDataFn from "../utils/handleData";
import * as handlePasswordFn from "../utils/handlePassword";

export const handleCreateUser = async (data) => {
  try {
    const { email, password, userName, firstName, lastName, sex, address } =
      data;
    const passwordHashed = handlePasswordFn.hashPassword(password);
    const user = await handleDataFn.findUser({ email, userName });
    if (!!user)
      return {
        code: 409,
        message: "User name or email is already exist",
        data: "",
      };

    await db.User.create({
      email,
      password: passwordHashed,
      userName,
      firstName,
      lastName,
      sex: +sex,
      address,
    });

    return {
      code: 201,
      message: "User has been created successfully",
      data: { email, userName, firstName, lastName, sex, address },
    };
  } catch (error) {
    return {
      code: 500,
      message: "Something wrong with server",
      data: "",
    };
  }
};

export const handleLogin = async (data) => {
  try {
    const { userName, password } = data;
    const user = await handleDataFn.findUser({
      email: userName || "",
      userName: userName || "",
    });

    if (user) {
      const hashedPassword = user.password;
      const isCorrect = handlePasswordFn.checkPassword(
        password,
        hashedPassword
      );
      const { email, userName, firstName, lastName, sex, address } = user;
      if (isCorrect) {
        return {
          code: 200,
          message: "Login successfully",
          data: { email, userName, firstName, lastName, sex, address },
        };
      }
    }

    return {
      code: 409,
      message: "User name or email is incorrect",
      data: "",
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      message: "Something wrong with server",
      data: "",
    };
  }
};

export const handleGetUsers = async (params) => {
  try {
    const page = params.page || 1;
    const limit = +params.limit || null;
    const offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "address",
        "sex",
        "groupId",
      ],
      offset,
      limit,
      include: [{ model: db.Group, attributes: ["name", "description"] }],
    });

    return {
      code: 200,
      message: "ok",
      data: {
        total: count,
        users: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      message: "Something wrong with server",
      data: "",
    };
  }
};

export const handleUpdateUser = async (data) => {
  try {
    const { id, firstName, lastName, sex, address, groupId } = data;
    await db.User.update(
      { firstName, lastName, sex: +sex, address, groupId },
      {
        where: {
          id,
        },
      }
    );

    return {
      code: 200,
      message: "User has been updated successfully",
      data: {},
    };
  } catch (error) {
    return {
      code: 500,
      message: "Something wrong with server",
      data: "",
    };
  }
};

export const handleDeleteUsers = async (data) => {
  try {
    const { ids } = data;
    const listId = ids?.split(",");
    await db.User.destroy({
      where: {
        id: listId,
      },
    });

    return {
      code: 200,
      message: "User has been deleted successfully",
      data: {},
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      message: "Something wrong with server",
      data: "",
    };
  }
};
