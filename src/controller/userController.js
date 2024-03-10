import * as userServices from "../service/userService";

export const handleCreateUser = async (req, res) => {
  userServices.handleCreateUser(req.body);
  res.send("create");
};
