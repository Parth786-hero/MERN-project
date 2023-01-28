const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const Customers = require("../models/model.js");
router.post("/register" , async (req,res)=>{
    try{
        const pass = req.body.password;
        const cpass = req.body.cpassword;
        // console.log(pass);
        if(pass === cpass){
            const customer =new Customers({
                username : req.body.username,
                number : req.body.number,
                email : req.body.email,
                gender : req.body.gender,
                password : pass,
                cpassword : cpass
            });

            const token = await customer.generateOuthToken();
            
            const ans = await customer.save();
            res.render("registerSuccess");
        }else{
            res.send("Password did not match .");
        }
        
    }catch(e){
        res.status(404).send(e);
    }
})
router.post("/login" , async (req , res)=>{
    try{
        const usernameBag = await Customers.findOne({username : req.body.username});
        const passwordByUser = req.body.password;
        const check = await bcrypt.compare(passwordByUser , usernameBag.password);
        if(check){
            res.render("loginSuccess");
        }else{
            res.send("<h1>Credentials did not match !!!!</h1>");
        }
       
    }catch(e){
        res.status(400).send("<h1>Credentials did not match .</h1>");
    }
    
})
router.get("/" , (req,res)=>{
    res.render("index");
    
});
router.get("/about" , (req,res)=>{
    res.render("about");
    
});
router.get("/login" , (req,res)=>{
    res.render("login");
    
});
router.get("/register" , (req,res)=>{
    res.render("register");
    
});
router.get("*" , (req,res)=>{
    res.render("error");
});
module.exports = router;