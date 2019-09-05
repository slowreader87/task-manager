const mongoose = require('mongoose')
const User = require('./user')
console.log('user model is running')

const taskSchema = mongoose.Schema({
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
        required: true,
        ref: 'User'
    }
}, {
    timestamps:true
})

const Task = mongoose.model('Task', taskSchema)

// const Task = mongoose.model('Task', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     owner: {
//         type: mongoose.SchemaTypes.ObjectId,
//         required: true,
//         ref: 'User'
//     }
// })

module.exports = Task

