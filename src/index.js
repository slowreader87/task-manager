const express = require('express')
const app = express()
require('../src/db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const path = require('path')

let allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', "*");
	res.header('Access-Control-Allow-Methods', "POST, PATCH, GET, DELETE")
	next();
}

app.use(allowCrossDomain);
app.use(express.json())

const public = path.join(__dirname, '/public')

app.use(express.static(public))

// User endpoints

// get all users - unlikely to need this in real app unless for an admin
app.get('/users', async (req, res) => {
	const users = await User.find({})

	res.send(users)
})

// get a single user - useful for viewing user profiles.
// Need to handle the case where id yields no valid user

app.get('/users/:id', async (req, res) => {
	const userId = req.params.id
	try {
		const user = await User.findById(userId)
		res.send(user)
	} catch (e) {
		return res.status(500).send(e)
	}
})


// create new user - this would be where signup does its work
app.post('/users', (req, res) => {

	const user = new User(req.body)

	user.save().then((user)=>{
		res.status(201).send(user)
	}).catch((err)=>{
		res.status(400).send(err)
	})

})

// patch existing user

app.patch('/users/:id', async (req, res) => {
	
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
		if (!user){
			return res.status(404).send()
		}
		res.send(user)
		
	} catch (e) {
		res.status(500).send(e)
	}
})

// Task endpoints
// get all tasks
app.get('/tasks', async (req, res) => {
	const tasks = await Task.find({})

	res.send(tasks)
})

// get a single task
app.get('/tasks/:id', async (req, res) => {
	const taskId = req.params.id

	try {
		const task = await Task.findById(taskId)
		res.send(task)
	} catch (e) {
		res.status(500).send(e)
	}
})

// patch a task

app.patch('/tasks/:id', async (req, res) => {
	
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

// create a task
app.post('/tasks', (req, res) => {
	const task = new Task(req.body)


	task.save().then((task) => {
		res.status(201).send(task)
	}).catch((err) => {
		res.status(400).send(err)
	})
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})