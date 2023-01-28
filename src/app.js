// in below code we are requiring the modules
 require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const router = require("./routers/route");
require("./database/connection");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));


// below are the paths to the folders in my project 
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname , "../templates/views");
const partialPath = path.join(__dirname , "../templates/partials");



// making use of the middleears here 
app.use(express.static(staticPath));
app.set("views" , viewPath);
app.set("view engine" , "hbs");
hbs.registerPartials(partialPath);
app.use(router);



// we are listening to the port here 
const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`I am onnn at ${port} ....`);
});