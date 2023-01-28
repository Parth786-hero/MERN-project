const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customerSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        uppercase : true,
        minlength : 3
    },
    number : {
        type : String,
        required : true,
        unique : true,
        validate(val){
            if(!validator.isMobilePhone(val)){
                throw new Error("Bhai no. toh shi daal le .");
            }
        }
        
    },
    email : {
        type : String,
        required : true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Bhai please add valid email .");
                alert("Kindly add valid email");
            }
        },
        minlength : 3
    },
    gender : {
        type : String,
        required : true
    },
    password : {
        type : String,
        minlength : 3,
        required : true
    },
    cpassword : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,

    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
});
// console.log(process.env.SECRET_KEY);
customerSchema.methods.generateOuthToken = async function(){
    try{
        const token = await jwt.sign({_id : this._id.toString()} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        const saveSchema = await this.save();
        return token;
    }catch(e){
        res.status(400).res.send("Bhai token generate nhi ho raha .");
    }
}

customerSchema.pre("save" , async function(next){
    
        
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password , 10);
            this.cpassword = await bcrypt.hash(this.password , 10);
        }
        next();
});
const Customers = new mongoose.model("Customer" , customerSchema);
module.exports = Customers;