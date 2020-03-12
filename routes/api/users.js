const route = require('express').Router()
const { createNewUser } = require('../../controller/users')

route.post('/', async (req, res) => {
    let userr = req.body.user
    let newuser = await createNewUser(userr.email, userr.username, userr.password)
    JSON.stringify(newuser)

    res.send({ user: newuser })
})


module.exports = { route }