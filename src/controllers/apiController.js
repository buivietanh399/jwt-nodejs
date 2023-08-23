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

module.exports = {
  testapi,
  handleRegister,
};
