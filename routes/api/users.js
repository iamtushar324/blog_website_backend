const route = require('express').Router()
const { users } = require('../../data/db')
const { checkBeforeReg } = require('../../middlewares/checkingBeforeRegister')
const { auth } = require('../../middlewares/auth')


const { createNewUser, findUser } = require('../../controller/users')


route.post('/', checkBeforeReg, async (req, res) => {
    let userr = req.body.user


    let newuser = await createNewUser(userr.email, userr.username, userr.password)


    res.send(newuser)
})



route.post('/login', async (req, res) => {
    let body = req.body.user

    let currentUser = await users.findOne({
        where: {
            email: body.email
        }
    })
        .then((userss) => {
            if (userss.password == body.password) {
                res.send(userss)
            }
            else {
                res.send(`
               {
                        "errors": {
                            "body": [
                                "Password is incorrect"
                            ]
                        }
                    }
               `)
            }
        })
        .catch(() => {
            res.send(`
            {
                    "errors": {
                        "body": [
                            "Invalid Email Id "
                        ]
                    }
                }
            `)
        })




})


module.exports = { route }