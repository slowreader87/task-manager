const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task

// const newTask = new Task({name: "go to work"})

// newTask.save().then((task)=>{
//     console.log(task)
// }).catch((e)=> {
//     console.log(e)
// })