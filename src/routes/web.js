import express from "express";
import homeController from '../controllers/homeController';

const router = express.Router();

const initWebroutes = (app) => {
    router.get('/', homeController.handleHomePage);
    router.get('/user', homeController.handleUser);
    router.post('/users/create-user', homeController.handleCreateUser);

    return app.use('/', router);
}

module.exports = initWebroutes;