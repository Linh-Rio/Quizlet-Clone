import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models";

//signup service
const salt = bcrypt.genSaltSync(12);
const secretKey = "6969";

let hanldeUserSignUp = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(data.email);

      if (!isExist) {
        isExist = await checkUserName(data.userName);
        if (!isExist) {
          let hashPassword = await useHashPassword(data.password);
          let user = (
            await db.User.create({
              email: data.email,
              userName: data.userName,
              password: hashPassword,
              firstName: data.firstName,
              lastName: data.lastName,
              birthday: data.birthday,
              avatar: data.avatar ? data.avatar : null,
            })
          ).get({ raw: true });

          let token = jwt.sign(
            { id: user.id, username: user.userName },
            secretKey,
            { expiresIn: "1h" }
          );

          userData.errCode = 0;
          userData.errMessage = "ok";
          userData.token = token;
          // remove id, pass, time before assign for userData
          let keysToDelete = ["password", "updatedAt", "createdAt"];
          for (let key of keysToDelete) {
            delete user[key];
          }
          userData.user = user;
        } else {
          userData.errCode = 2;
          userData.errMessage = `Your's username is exist`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's email is exist`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserName = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { userName },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let useHashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

// login service
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        // user already exist
        // compare password
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "password",
            "userName",
            "firstName",
            "lastName",
            "birthday",
            "avatar",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            let token = jwt.sign(
              { id: user.id, username: user.userName },
              secretKey,
              { expiresIn: "1h" }
            );

            userData.token = token;
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's email isn't exist in the system. Please try other email!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin,
  hanldeUserSignUp,
};
