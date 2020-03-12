const route = require('express').Router()


route.use('/users', require('./users').route)
route.use('/articles', require('./articles').route)




module.exports = { route }