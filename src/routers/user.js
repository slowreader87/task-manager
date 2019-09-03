const express = require('express')
//const app = express()
require('../db/mongoose')
const User = require('../models/user')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const auth = require('../middleware/auth')

const router = new express.Router()

// create new user - this would be where signup does its work
router.post('/users', async (req, res) => {

	const user = new User(req.body)
	try {
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({user, token})

	} catch (e) {
		if (e.message.includes('duplicate')){
			res.status(400).send('User already exists, please sign-in')
		} else if (e.message.includes('password') && e.message.includes('required')) {
			res.status(400).send('Please provide a password')
		} else if (e.message.includes('password') && e.message.includes('shorter')) {
			res.status(400).send('Password too short')
		} else if (e.message.includes('name') && e.message.includes('required')) {
			res.status(400).send('Please enter your name')
		} else if (e.message.includes('email') && e.message.includes('required')) {
			res.status(400).send('Please enter your email')
		} else 
			res.status(400).send(e.message)	
	}
})

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({user, token})
	} catch (e) {
		res.status(400).send(e.message)
	}

})

router.delete('/users', auth, async (req, res) => {
	await req.user.remove()
	res.send(req.user)
})

// get my user profile
router.get('/users/me', auth, (req, res) => {	
	res.send(req.user)
})

// change profile details
// can't get this to work. I want to have the user login, then click the change details button
// and it sends you on to the changedetails page with a pre-filled form of user details
// user changes their details and clicks save which sends a patch to users/me

router.get('/changedetails', async (req, res) => {
	//res.send(req.user)
	res.render('changedetails', {title: 'Change Details'})
})

// logout of current session - requires authentication

router.get('/users/logout', auth, async (req, res) => {

	const activeToken = req.user.activeToken
	
	const indexOfToken = req.user.tokens.findIndex((token)=>{
		return token === activeToken
	})
	
	req.user.tokens.splice(indexOfToken, 1)
	
	// alternative would be to set the tokens array to a filtered version of itself:

	// req.user.tokens = req.user.tokens.filter((token) => {
	// 	return token !== activeToken
	// }) // this didn't work... think you need a new variable which is cumbersome anyway
	await req.user.save()
	res.send('logged out of current session')
})

// logout of all sessions - requires authentication
router.get('/users/logoutall', auth, async (req, res) => {
	req.user.tokens = []
	await req.user.save()
	res.send('logged out of all sessions')
})

// patch existing user. Needs to change so that endpoint is just /usersMe and instead of user
// being found from findById it is simply given over to auth and set as req.user

router.patch('/users/me', auth, async (req, res) => {

	const allowedUpdates = ['name', 'email', 'age', 'password']
	const submittedUpdatesArr = Object.keys(req.body)
	const isValidUpdate = submittedUpdatesArr.every(update => allowedUpdates.includes(update))
	
	if (!isValidUpdate){
		return res.status(400).send('invalid user update')
	}

	try {
		submittedUpdatesArr.forEach((update)=> {req.user[update]=req.body[update]})
		await req.user.save()
		res.send(req.user)
		} 
	catch (e) {
		res.status(500).send(e)
	}
})


module.exports = router