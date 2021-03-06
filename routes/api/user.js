
const route = require('express').Router()
const { auth } = require('../../middlewares/auth')
const { users } = require('../../data/db')


async function getUserObj(req, res) {
    let token = false
    if (req.session) { token = req.session.token }




    if (token) {
        let User = await users.findOne({
            where: {
                token: token
            }
        })

        return User
    }
    else return false

}

route.get('/islogin', auth, async (req, res) => {
    let user = await getUserObj(req, res)

    res.send(user)

})




route.get('/', auth, async (req, res) => {

    let current = await getUserObj(req, res)

    current = {
        user: {
            "email": current.email,
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
    try {
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
                "username": currentUser.username,
                "bio": currentUser.bio,
                "image": currentUser.image
            }
        }
    }
    catch (err) {
        res.send(err)
    }

    res.send(currentUser)

})



module.exports = { route, getUserObj }