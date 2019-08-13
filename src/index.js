const express = require('express')
const app = express()


let allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', "*");
	next();
}
app.use(allowCrossDomain);

app.use(express.json())

app.get('/users', (req, res) => {
	res.send('testing')
})

app.post('/users', (req, res) => {
	res.status(201)
	console.log(req.body)
	res.send(req.body)
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})