import loginRegisterService from "../services/loginRegisterService";

const testapi = (req, res) => {
  return res.status(200).json({
    message: "Oke",
    data: "Hello world!",
  });
};

const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required",
        EC: "1",
        DT: "", //date
      });
    }

    if (req.body.password && req.body.password.length < 3) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters",
        EC: "-1",
        DT: "",
      });
    }

    //service: create user
    let data = await loginRegisterService.registerNewUser(req.body);

    console.log(">>> Check data: ", data);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body.valueLogin || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required",
        EC: "-2",
        DT: "", //data
      });
    }

    let data = await loginRegisterService.handleUserLogin(req.body);

    //set cookie
    //console.log(data.DT);
    res.cookie("jwt", data.DT.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Something went wrong ... ",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  testapi,
  handleRegister,
  handleLogin,
};
