const route = require('express').Router()

route.get('/', (req, res) => {
    res.send('heelo')
})


module.exports = { route }