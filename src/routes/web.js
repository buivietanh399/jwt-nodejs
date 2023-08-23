import express from "express";
import homeController from "../controllers/homeController";
import apiController from "../controllers/apiController";
const router = express.Router();

const initWebroutes = (app) => {
  router.get("/", homeController.handleHomePage);
  router.get("/user", homeController.handleUser);
  router.post("/users/create-user", homeController.handleCreateUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);
  router.get("/api/test-api", apiController.testapi);
  return app.use("/", router);
};

module.exports = initWebroutes;
