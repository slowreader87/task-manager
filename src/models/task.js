const mongoose = require('mongoose')

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

module.exports = Task

// test invoking task

// const todo = new Task({
//     description: 'wash car',
//     completed: false
// })

// todo.save().then(()=>{
//     console.log(todo)
// }).catch((err)=>{
//     console.log(err)
// })