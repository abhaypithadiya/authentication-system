const express = require('express');
const app = express();
const mongoose = require('mongoose');

const DB = "mongodb+srv://loginSystem:Abhay1234@login-system.fxffb.mongodb.net/login-details?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`connection successful!`);
}).catch((err)=>console.log(err));

const User = require('./userSchema');

app.use(express.json());

app.post('/register', (req,res)=> {
    const {number,otp} = req.body;
    const user = new User({number,otp});

    user.save().then(()=>{
        res.status(201).json({message:"Successfull"})
    }).catch((err)=>res.status(500).json(err));
})

app.get('/find',(req,res)=>{
    User.find({otp:'1234'},(err,data)=>{
        if(err){
            console.log(err);
        } else{
            console.log(data);
        }
    })
})

app.listen(3001,()=>{
    console.log(`server is running`);
})



