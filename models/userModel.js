const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {type:String, required: true, unique:true},
    email: {type:String, required: true, unique:true},
    password :{type:String, required: true}
})

userSchema.pre('save', async function(next) {
    try {
        // Only hash the password if it's modified (or new)
        if (!this.isModified('password')) {
            console.log('Password not modified, skipping hash');
            return next();
        }
        
        console.log('Hashing password...');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        console.log('Password hashed successfully');
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error);
    }
});

//comparing password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

// Remove password when converting to JSON
userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model('User', userSchema)
