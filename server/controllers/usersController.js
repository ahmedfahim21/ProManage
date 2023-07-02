const Model = require('../models/Users.Model');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// @desc   Register user
// @route  POST /users/register
// @access Public
const RegisterUser = asyncHandler( async(req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).send("Please fill all fields");
    }

    //checkIfUserExists
    const userExists = await Model.findOne({email: email}); 
    if(userExists){
        res.status(400).send("User already exists");
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
        const regtoken = generateToken(data._id,res);
        res.status(201).json({
            _id: data._id,
            name: data.name,
            email: data.email,
            token: regtoken
        })
    }else{
        res.status(400).send("Invalid user data");
    }
})

// @desc   Login user
// @route  POST /users/login
// @access Public
const LoginUser = asyncHandler(async(req,res)=>{

    const {email, password} = req.body;

    const user = await Model.findOne({email: email});

    
    if(user && (await bcrypt.compare(password, user.password))){
        const logintoken = generateToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: logintoken
        })
    }else{
        res.status(400).send("Invalid email or password");
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
        res.status(404).send("User not found");
    }

}

// @desc   Logout user
// @route  GET /users/logout
// @access Private
const LogoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt', 'logout', {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: "Logout successful"});
})



module.exports = {
    RegisterUser,
    LoginUser,
    GetMe,
    LogoutUser
}
