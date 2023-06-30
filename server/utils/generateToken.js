const jwt = require('jsonwebtoken');

//Generate token
const generateToken = (id,res)=>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    res.cookie('jwt', token, {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000
    })

    return token;
}

module.exports = generateToken;