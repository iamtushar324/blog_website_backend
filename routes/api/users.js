const route = require('express').Router()


route.post('/', (req, res) => {
    console.log(req.body.user)
    res.send("done")
})


module.exports = { route }