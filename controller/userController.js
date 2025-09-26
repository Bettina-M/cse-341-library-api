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
        
        const { email, password } = req.body;
        const user = await User.findOne({ email, provider: "local" });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return res.status(401).json({ message: "Invalid email or password" });
        req.login(user, (err) => {
            if (err) return next(err);
            res.json({ message: "Logged in", user: { id: user._id, email: user.email } });
        });
    }
    catch (err) { next(err); }
}

    exports.logoutUser= async (req, res, next) =>{
        try {
            req.logout((err) => {
                if (err) return next(err);
                req.session.destroy(() => res.json({ message: "Logged out" }));
            });
        } catch (error) {
            next(error);
        }   
    }
