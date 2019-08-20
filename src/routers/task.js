const express = require('express')
//const app = express()
require('../db/mongoose')
const Task = require('../models/task')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const router = new express.Router()

// get all tasks
router.get('/tasks', async (req, res) => {
	const tasks = await Task.find({})
    res.send(tasks)
})

// create a task with form
router.get('/createtask', (req, res) => {
    res.render('createtask')
})


// create a task
router.post('/tasks', (req, res) => {
	const task = new Task(req.body)


	task.save().then((task) => {
		res.status(201).send(task)
	}).catch((err) => {
		res.status(400).send(err)
	})
})

// get a single task
router.get('/tasks/:id', async (req, res) => {
	const taskId = req.params.id

	try {
		const task = await Task.findById(taskId)
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})

// patch a task

router.patch('/tasks/:id', async (req, res) => {
	
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



module.exports = router