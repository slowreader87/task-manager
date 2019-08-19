const express = require('express')
const app = express()
require('../src/db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

let allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', "*");
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept') // posts from chromium
	res.header('Access-Control-Allow-Methods', "POST, PATCH, GET, DELETE") // allows patch
	
	next();
}

const pageText = {
	copyright: 'Copyright Charlie Afif, all rights reserved 2019',
	credits: 'Site made by Charlie Afif 2019'
}

app.use(allowCrossDomain);
app.use(express.json())

const public = path.join(__dirname, '/public')

app.use(express.static(public))

app.set('view engine', 'hbs')

const viewsDirPath = path.join(__dirname, '../templates/views')
app.set('views', viewsDirPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)
// directs visitors of the root page to index.hbs. render must refer to views by default

app.get('', (req, res) => {
	res.render('index', {
		title: 'My Task-Manager App',
		body: 'Enter and track your tasks here!',
		copyright: pageText.copyright,
		credits: pageText.credits
	})
})

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
app.post('/users', async (req, res) => {

	const user = new User(req.body)

	await user.save().then((user)=>{
		res.send(user)
	}).catch((err) =>{
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
// experiment to see if you could inject html into hbs templates. 
// you can't. just textContent it seems. as users renders as an object.toString(), even if you
// try to use it to generate html with template strings.
// if you could then you could serve up dynamic html from here like a results list
// meaning the client wouldn't have to render it all, meaning your client is integrated.

app.get('/results', async (req, res) => {
	const users = await User.find({})

	let html = '{{>header}}'
	users.forEach((user)=>{
		html += `<p>Name:${user.name} Email:${user.email}</p>`
	})
	html += '{{>footer}}'
	
	const resultsPath = path.join(__dirname, '../templates/views/result.hbs')
	fs.unlink(resultsPath, ()=>{})
	fs.appendFile(resultsPath, html, (err, data) =>{
		if(err){
			return console.log(err)
		}
		console.log('created result.hbs. rendering')
		res.render('result')
	})

})

const today = new Date()

app.get('*', (req, res) => {
	res.render('404', {
		title: "Title: Overidden from res.render. Error page!",
		errorText: "ErrorText: sorry, page not found",
		copyright:pageText.copyright,
		credits:pageText.credits,
		date:today
	})
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})