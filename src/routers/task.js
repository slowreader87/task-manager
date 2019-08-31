const express = require('express')
//const app = express()
require('../db/mongoose')
const Task = require('../models/task')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const auth = require('../middleware/auth')

const router = new express.Router()

// get all tasks
router.get('/tasks', auth, async (req, res) => {
	const tasks = await Task.find({owner:req.user._id})
	// tasks.populate('owner').execPopulate()
	// res.send(tasks.owner.email)
	res.send(tasks)
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

router.get('/edittask', (req, res) => {
	res.render('edittask')
})

// get a single task MIGHT BE A CONFLICTING ROUTE
router.get('/tasks/:id', auth, async (req, res) => {
	const taskId = req.params.id

	try {
		const task = await Task.findById(taskId)
		// task.populate('owner').execPopulate()
		//res.send(task.owner.email)
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})

// patch a task

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



module.exports = router