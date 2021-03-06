const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error ('email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'somesecret')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials = async function (email, password) {

    const user = await User.findOne({email})

    if (!user){
        throw new Error ('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error ('unable to login')
    }
    return user
}

userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)    
    }
    next()
})

userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({ owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema )

module.exports = User
// test invoking user
// const me = new User({
//     name:'chaz',
//     email:'chaz@chaz.com',
//     password: 'bottles'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((err) => {
//     console.log(err)
// })
