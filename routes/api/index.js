const route = require('express').Router()


route.use('/users', require('./users').route)
route.use('/articles', require('./articles').route)
route.use('/user', require('./user').route)
route.use('/profiles', require('./profiles').route)
route.use('/tags', require('./tags').route)




module.exports = { route }