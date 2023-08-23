import express from "express";
import homeController from "../controllers/homeController";
import apiController from "../controllers/apiController";
const router = express.Router();

const initApiroutes = (app) => {
  router.get("/test-api", apiController.testapi);
  router.post("/register", apiController.handleRegister);
  return app.use("/api/v1", router);
};

module.exports = initApiroutes;
