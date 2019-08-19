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

	await user.save().then((user)=>{
		res.send(user)
	}).catch((err) =>{
		res.status(400).send(err)
	})

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


module.exports = router