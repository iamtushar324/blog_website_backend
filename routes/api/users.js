const route = require('express').Router()


route.get('/', (req, res) => {
    res.send('heloe users')
})


module.exports = { route }