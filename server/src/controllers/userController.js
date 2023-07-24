import { userService } from "../services";

// signup controller
let handleSignUp = async (req, res) => {
  // 6 attributes (firstName, lastName, userName, email, password, birthday)
  if (checkAllValues(req.body, ["avatar"])) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
      user: {},
      token: "",
    });
  }
  let userData = await userService.hanldeUserSignUp(req.body);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
    token: userData.token ? userData.token : "",
  });
};
let checkAllValues = (obj, nonecheck = []) => {
  delete obj[nonecheck];
  let values = Object.values(obj);
  return !values.every(
    (value) => value !== undefined && value !== null && value !== ""
  );
};

// login controller
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
      user: {},
      token: "",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  //check email exist
  //compare password
  //return userInfor
  //access_tokent: JWT json web token

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
    token: userData.token ? userData.token : "",
  });
};

module.exports = { handleLogin, handleSignUp };
