const Model = require('../models/Users.Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc   Register user
// @route  POST /users/register
// @access Public
const RegisterUser = asyncHandler( async(req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill all fields");
    }

    //checkIfUserExists
    const userExists = await Model.findOne({email: email}); 
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //hashPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = await Model.create({
        name,
        email,
        password: hashedPassword
    })

    if(data){
        res.status(201).json({
            _id: data._id,
            name: data.name,
            email: data.email,
            token: generateToken(data._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

// @desc   Login user
// @route  POST /users/login
// @access Public
const LoginUser = asyncHandler(async(req,res)=>{

    const {email, password} = req.body;

    const user = await Model.findOne({email: email});
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid email or password");
    }

})

//@desc    Get user data
//@route   GET /users/me
//@access  Private
const GetMe = async (req,res)=>{
    const user = await Model.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(404);
        throw new Error("User not found");
    }

}

//Generate token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {
    RegisterUser,
    LoginUser,
    GetMe
}
