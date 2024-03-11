import * as userServices from "../service/userService";

export const handleGetListUser = async (req, res) => {
  const users = await userServices.getListUser();
  res.render("home", { users });
};

export const handleCreateUser = async (req, res) => {
  userServices.handleCreateUser(req.body);
  res.redirect(req.get("referer"));
};

export const handleDeleteUser = async (req, res) => {
  userServices.handleDeleteUser(req.params.id);
  res.redirect(req.get("referer"));
};

export const handleGetUser = async (req, res) => {
  const dataUser = await userServices.getUserInfo(req.params.id);
  res.render("updateUser", { dataUser });
};

export const handleUpdateUser = async (req, res) => {
  userServices.handleUpdateUser(req.body);
  res.redirect("/user");
};
