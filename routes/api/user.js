
const route = require('express').Router()
const { auth } = require('../../middlewares/auth')
const { users } = require('../../data/db')


async function getUserObj(req, res) {
    let token = req.headers['authorization']
    toString(token)
    let tokenValue = token.slice(6, token.length)
    let nuser
    let User = await users.findOne({
        where: {
            token: tokenValue
        }
    })

    return User

}


route.get('/', auth, async (req, res) => {

    let current = await getUserObj(req, res)

    current = {
        user: {
            "email": current.email,
            "token": current.token,
            "username": current.username,
            "bio": current.bio,
            "image": current.image
        }
    }
    res.send(current)


})

route.put('/', auth, async (req, res) => {

    let upUser = req.body.user

    let currentUser = await getUserObj(req, res)

    if (upUser.email) {
        currentUser.email = upUser.email
    }

    if (upUser.username) {
        currentUser.username = upUser.username
    }
    if (upUser.password) {
        currentUser.password = upUser.password
    }
    if (upUser.image) {
        currentUser.image = upUser.image
    }

    if (upUser.bio) {
        currentUser.bio = upUser.bio
    }

    await currentUser.save()

    currentUser = {
        user: {
            "email": currentUser.email,
            "token": currentUser.token,
            "username": currentUser.username,
            "bio": currentUser.bio,
            "image": currentUser.image
        }
    }

    res.send(currentUser)

})



module.exports = { route, getUserObj }