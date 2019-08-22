const express = require('express')
//const app = express()
require('../db/mongoose')
const User = require('../models/user')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const router = new express.Router()

// create new user - this would be where signup does its work
router.post('/users', async (req, res) => {

	const user = new User(req.body)

	console.log(user)
	if(!user) {
		return res.status(404).send()
	}

	await user.save()
	res.send(user)
	// await user.save().then((user)=>{
	// 	res.send(user)
	// }).catch((err) =>{
	// 	res.status(400).send(err)
	// })
})

router.post('/users/login', async (req, res) => {
	const user = await User.find({email:req.body.email})

	if (!user){
		return res.status(400).send()
	}
})

// get all users - unlikely to need this in real app unless for an admin
router.get('/users', async (req, res) => {
	const users = await User.find({})

	res.send(users)
})

// Get single user. Need to handle the case where id given yields no valid user

router.get('/users/:id', async (req, res) => {
	const userId = req.params.id
	try {
        const user = await User.findById(userId)
        if (!user){
            return res.status(400).send()
        }
		res.send(user)
	} catch (e) {
		return res.status(500).send(e)
	}
})

// patch existing user

router.patch('/users/:id', async (req, res) => {

	const allowedUpdates = ['name', 'email', 'age', 'password']
	const submittedUpdatesArr = Object.keys(req.body)
	const isValidUpdate = submittedUpdatesArr.every(update => allowedUpdates.includes(update))
	
	if (!isValidUpdate){
		return res.status(400).send('invalid user update')
	}

	try {
		const user = await User.findById(req.params.id)
		if (!user){
			return res.status(404).send()}

		submittedUpdatesArr.forEach((update)=> {user[update]=req.body[update]})
		await user.save()
		res.send(user)
		} 
	catch (e) {
		res.status(500).send(e)
	}
})


module.exports = router