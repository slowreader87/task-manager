const express = require('express')
//const app = express()
require('../db/mongoose')
const Task = require('../models/task')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const auth = require('../middleware/auth')
const User = require('../models/user')

const router = new express.Router()

// get all tasks
router.get('/tasks', auth, async (req, res) => {
	// either do the following
	const tasks = await req.user.populate('tasks').execPopulate() // either or
	res.send(req.user.tasks)
	// or 
	// const tasks = await Task.find({owner:req.user._id}) 
	// res.send(tasks)
})

// create a task with form
router.get('/createtask', (req, res) => {
    res.render('createtask')
})

// create a task
router.post('/tasks', auth, (req, res) => {

	const task = new Task({
		...req.body,
		owner: req.user._id
	})
	
	task.save().then((task) => {
		res.status(201).send(task)
	}).catch((err) => {
		res.status(400).send(err)
	})
})

// renders the edittask hbs template
router.get('/edittask', (req, res) => {
	res.render('edittask')
})

// get a single task. Problem with nested routes not picking up style sheet or js files.
router.get('/tasks/:id', auth, async (req, res) => {
	const taskId = req.params.id

	try {
		const task = await Task.findOne({_id:taskId, owner:req.user._id})
		if (!task) {
			res.status(404).send('no task found')
		}
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})

// patch a task. Used by the edittask.js file

router.patch('/tasks/:id', async (req, res) => {
	const submittedUpdatesArr = Object.keys(req.body)
	const allowedUpdates = ['name', 'description', 'completed']
	const isValidUpdate = submittedUpdatesArr.every((update)=> allowedUpdates.includes(update))
	
	if (!isValidUpdate){
		return res.status(400).send('invalid update submitted')
	}
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
		if (!task){
			return res.status(404).send()
		}
		res.send(task)
		
	} catch (e) {
		res.status(500).send(e)
	}
})

router.delete('/tasks/:id', async (req, res) => {
	const id = req.params.id
	try {
		const task = await Task.findByIdAndDelete(id)
		return res.send(task)
	} catch (e) {
		res.send(e)
	}
})

// Test user route to check virtual property 'tasks' added to users with tasks
router.get('/testingtasks/:id', async (req, res) => {
	const userId = req.params.id
	const user = await User.findById(userId)
	await user.populate('tasks').execPopulate()
	res.send(user.tasks) 
})

// Test task route to check that all owner properties can be reached from a task
// via the new owner property on the task schema

router.get('/testinguserinfo/:id', async (req, res) => {
	const taskId = req.params.id
	const task = await Task.findById(taskId)
	await task.populate('owner').execPopulate() // if you don't run this line you can only return
	// the owner's object ID. if you use this line though you can return all info for the owner
	res.send(task.owner)
})

module.exports = router