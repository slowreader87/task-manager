const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true,
    useCreateIndex:true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
        minlength: 0
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const me = new User({
    name:'chaz',
    email:'chaz@chaz.com',
    password: 'bottles'
})

me.save().then(()=>{
    console.log(me)
}).catch((err) => {
    console.log(err)
})

const todo = new Task({
    description: 'wash car',
    completed: false
})

todo.save().then(()=>{
    console.log(todo)
}).catch((err)=>{
    console.log(err)
})