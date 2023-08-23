import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }

  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }

  return false;
};

const checkUsernameExist = async (userName) => {
  let user = await db.User.findOne({
    where: { phone: userName },
  });

  if (user) {
    return true;
  }

  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phone are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exists",
        EC: "1",
      };
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone number is already exists",
        EC: "1",
      };
    }

    let isUsernameExist = await checkUsernameExist(rawUserData.username);
    if (isUsernameExist === true) {
      return {
        EM: "Username is already exists",
        EC: "1",
      };
    }

    //hash password
    let hassPassword = await hashUserPassword(rawUserData.password);

    //create new user
    let newUser = await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.username,
      password: hassPassword,
    });
    console.log(">> Check newUser: ", newUser);

    return {
      EM: "Create new user successfully",
      EC: "0",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong in this service ...",
      EC: "-1",
    };
  }
};

module.exports = {
  registerNewUser,
};
