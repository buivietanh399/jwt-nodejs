require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = () => {
  let payload = {
    name: "vanh",
    address: "HD",
  };

  let secret = process.env.JWT_SECRET;

  let token = jwt.sign(payload, secret);
  console.log(token);
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  console.log(data);
  return data;
};
module.exports = {
  createJWT,
  verifyToken,
};
