import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB'

require('dotenv').config();


let app = express();
let port = process.env.PORT || 6969;

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


viewEngine(app);
initWebRoutes(app);

connectDB();


app.listen(port, () => {
    console.log('server is running on', port)
});