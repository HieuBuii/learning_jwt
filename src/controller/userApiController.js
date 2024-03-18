import * as userApiServices from "../service/userApiService";

export const handleCreateUser = async (req, res) => {
  const data = await userApiServices.handleCreateUser(req.body);
  res.status(200).json(data);
};

export const handleLogin = async (req, res) => {
  const data = await userApiServices.handleLogin(req.body);
  res.status(200).json(data);
};

export const handleGetUsers = async (req, res) => {
  const data = await userApiServices.handleGetUsers(req.query);
  res.status(200).json(data);
};
export const handleUpdateUser = async (req, res) => {
  const data = await userApiServices.handleUpdateUser(req.body);
  res.status(200).json(data);
};
export const handleDeleteUsers = async (req, res) => {
  const data = await userApiServices.handleDeleteUsers(req.body);
  res.status(200).json(data);
};
