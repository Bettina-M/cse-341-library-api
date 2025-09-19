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

async function getAllUsers(req, res, next){
    try{
        const users = await User.find()
        if(!users) return res.status(404).json({message:'No users found'})
        res.status(200).json(users)
    }catch(error){
        next(error)
    }
}

async function updateUser(req, res, next){
    try{
        const userId = req.params.id
        const updateData ={
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        }
        const user = await User.findByIdAndUpdate(userId, updateData, {new:true})
        if(!user) return res.status(404).json({message:'User not found'})
        res.status(200).json(user)
    }catch(error){
        next(error)
    }   
}

async function deleteUser(req, res, next){
    try{
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        if(!user) return res.status(404).json({message:'User not found'})
        res.status(200).json({message:'User deleted successfully'})
    }catch(error){
        next(error)
    }   
}

module.exports = {registerUser, getAllUsers, updateUser, deleteUser}