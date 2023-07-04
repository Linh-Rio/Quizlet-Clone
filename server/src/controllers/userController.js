import userService from "../services/userService";

// signup controller
let handleSignUp = async (req, res) => {
  // 6 attributes (firstName, lastName, userName, email, password, birthday)
  console.log(checkAllValues(req.body));
  if (checkAllValues(req.body)) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
      user: {},
    });
  }
  let userData = await userService.hanldeUserSignUp(req.body);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let checkAllValues = (obj) => {
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
  });
};

module.exports = { handleLogin, handleSignUp };
