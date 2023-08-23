require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import connection from "./config/connectDB";
import cors from "./config/cors";

const app = express();
const port = process.env.PORT || 8080;

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//config cors
cors(app);

//config ejs
configViewEngine(app);

// API
initApiRoutes(app);

// Routes
initWebRoutes(app);

// test connection db
connection();

app.listen(port, () => {
  console.log(`Server is running on: localhost:${port}`);
});
