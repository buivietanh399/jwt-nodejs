require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import connection from "./config/connectDB";
import cors from "./config/cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8080;

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//config cors
cors(app);

//config ejs
configViewEngine(app);

//config cookie-parser
app.use(cookieParser());

// API
initApiRoutes(app);

// Routes
initWebRoutes(app);

// test connection db
//connection();

// middleware req
app.use((req, res) => {
  return res.send("404 not found!");
});

app.listen(port, () => {
  console.log(`Server is running on: localhost:${port}`);
});
