const express = require('express')
const app = express()

app.post('/users', (req, res) => {
    res.send('testing')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})