const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/register",async (req,res)=> {
    if (req.body.password.length < 5 || req.body.password.length > 16)
    {
        return res.status(400).json({sucess: false,message: "password length should be in range of 5 to 16 charecter"})
    };
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password
    });
    try{
        const saveduser = await newUser.save();
    const {password, ...others} = saveduser._doc; 
        const accessToken = jwt.sign({
            id:saveduser._id, 
            isAdmin: saveduser.isAdmin,
      
          }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_SECRET_EXPIRE || "3d"});
        res.status(201).json({...others, accessToken}); 
    }
    catch (err) {
        console.log(err)
        if(err.code === 11000) { 
          return res.status(400).json({sucess: false,message: "account with this email already exist"}) 
        } else if (err.name === "ValidationError") {
            if (err.name == 'ValidationError') {
              for (field in err.errors) {
                return res.status(400).json({sucess: false,message: err.errors[field].message}); 
              }
            }
        } else {
        console.log(`Logged Error from register user : ${err}`)
        return res.status(500).json({sucess: false,message: "internal server error"})
        }
    }

});

router.post("/login",async (req,res)=>{
    console.log(req.body)
    if(!req.body.email || !req.body.password)
    {
        res.status(400).json({sucess:false,message:"please provide email and password"})
    }

    try
    {
        const user = await User.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(400).json({sucess: false,message: "user with this emil dosent exist"})
        }

        //checking for admin
        if(req.body.forAdmin)
        {
            if(!user.isAdmin)
            {
                return res.status(400).json({sucess:false, message:"wrong credentials"})
            }
        }

        if(!req.body.forAdmin && user.isAdmin)
        {
            return res.status(400).json({sucess:false, message:"wrong credentials"})
        }

        if(req.body.password !== user.password)
        {
            return res.status(400).json({sucess: false,message: "wrong credentials"}) 
        }

        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin: user.isAdmin,
    
          }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_SECRET_EXPIRE || "3d"}); 
          
        const {password,resetPasswordToken,resetPasswordExpire, ...others} = user._doc
        res.status(200).json({...others, accessToken})
    }
    catch (err) {
        console.log(`Logged Error from login user : ${err}`)
        return res.status(500).json({ // Worked
          sucess: false,message: "Internal server error",
        });
        
    }
});

module.exports = router;