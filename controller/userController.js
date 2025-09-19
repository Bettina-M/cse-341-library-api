const User = require('../models/userModel')

async function registerUser(req, res, next){
    try{
        const userData = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    }

    const user = new User(userData)
    await user.save()
    if(!user) return res.status(400).json({message:'User not saved'})
        res.status(201).json(user)
    }catch(error){
        next(error)
    }
    
}

module.exports = {registerUser}