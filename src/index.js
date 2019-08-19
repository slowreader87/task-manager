const express = require('express')
const app = express()
require('../src/db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

let allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', "*");
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept') // posts from chromium
	res.header('Access-Control-Allow-Methods', "POST, PATCH, GET, DELETE") // allows patch
	
	next();
}

app.use(express.json())
app.use(allowCrossDomain);

app.use(userRouter)
app.use(taskRouter)

const public = path.join(__dirname, '/public')

app.use(express.static(public))

app.set('view engine', 'hbs')

const viewsDirPath = path.join(__dirname, '../templates/views')
app.set('views', viewsDirPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


// directs visitors of the root page to index.hbs. render must refer to views by default

const pageText = {
	copyright: 'Copyright Charlie Afif, all rights reserved 2019',
	credits: 'Site made by Charlie Afif 2019'
}

// site root route
app.get('', (req, res) => {
	res.render('index', {
		title: 'My Task-Manager App',
		body: 'Enter and track your tasks here!',
		copyright: pageText.copyright,
		credits: pageText.credits
	})
})

app.get('/results', async (req, res) => {
	const users = await User.find({})

	// start off with the header partial
	let html = '{{>header}}' 
	// add to this the html list of users
	users.forEach((user)=>{
		html += `<p>Name:${user.name} Email:${user.email} Id: ${user._id}</p>`
	})
	// add on the footer partial
	html += '{{>footer}}'
	
	// create the path for the combined file as result.hbs
	const resultsPath = path.join(__dirname, '../templates/views/result.hbs')

	// remove any existing file of the same name
	fs.unlink(resultsPath, ()=>{})

	// create a new file in the defined path
	fs.appendFile(resultsPath, html, (err, data) =>{
		if(err){
			return console.log(err)
		}
		console.log('created result.hbs. rendering')
		// render new file to the client
		res.render('result')
	})

})

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