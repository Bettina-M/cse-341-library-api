const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.registerUser = async (req, res, next)=>{

try {
    const { email, password, userName } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash, userName, provider: "local" });
    await user.save();

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({ message: "Registered", user: { id: user._id, email: user.email } });
    });
  } catch (err) { next(err); }
};

 exports.loginUser = async (req, res, next) =>{
    try {
        
        const { email, password } = req.body
        const user = await User.findOne({ email, provider: "local" })
        if (!user) return res.status(401).json({ message: "Invalid email or password" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid email or password" });
        req.login(user, (err) => {
            if (err) return next(err)
            res.json({ message: "Logged in", user: { id: user._id, email: user.email } });
        });
    }
    catch (err) { next(err); }
}

    exports.logoutUser= async (req, res, next) =>{
        try {
            req.logout((err) => {
                if (err) return next(err)
                req.session.destroy(() => res.json({ message: "Logged out" }))
            })
        } catch (error) {
            next(error)
        }   
    }

    exports.getUserbyId = async (req, res, next) =>{
        try {
            const user = await User.findById(req.params.id).select('_id')
            if (!user) return res.status(404).json({ message: "User not found" })
            res.json(user)
        } catch (error) {
            next(error)
        }
    }

    exports.getAllUsers = async (req, res, next) =>{
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            next(error)
        }
    }

    exports.updateUser = async (req, res, next) =>{
        try {
            const { email, password, userName } = req.body
            const user = await User.findById(req.params.id)
            if (!user) return res.status(404).json({ message: "User not found" })
            if (email) user.email = email
            if (password) user.password = await bcrypt.hash(password, 10)
            if (userName) user.userName = userName
            await user.save()
            res.json({ message: "User updated", user: { id: user._id, email: user.email } })
        } catch (error) {
            next(error)
        }
    }

    exports.deleteUser = async (req, res, next) =>{
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if (!user) return res.status(404).json({ message: "User not found" })
            res.json({ message: "User deleted" })
        } catch (error) {
            next(error)
        }
    }
