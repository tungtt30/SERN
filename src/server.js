import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB'
import cors from 'cors'

require('dotenv').config();


let app = express();
let port = process.env.PORT || 6969;


//-----------------CORS-------------------
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({
  origin: true
}))

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


viewEngine(app);
initWebRoutes(app);

connectDB();



app.listen(port, () => {
  console.log('server is running on', port)
});