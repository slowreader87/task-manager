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
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
})

module.exports = Task

// const newTask = new Task({name: "Check on ReMarkable Return"})

// newTask.save().then((task)=>{
//     console.log(task)
// }).catch((e)=> {
//     console.log(e)
// })

