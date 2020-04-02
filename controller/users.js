const { users } = require('../data/db')
const seq = require('sequelize')
const { random_gen } = require('../util/token_gen')


async function createNewUser(email, username, password) {

    let tok = random_gen(30)
    let newUser;


    const user = await users.create({
        email: email,
        username: username,
        password: password,
        token: tok,
        following: [],
        favArt: [],
        image: "https://robohash.org/" + username
    }).then((user) => {
        console.log("New user created")
        newUser = user.dataValues
        newUser = {
            user: {
                "email": newUser.email,
                "token": newUser.token,
                "username": newUser.username,
                "bio": newUser.bio,
                "image": newUser.image
            }
        }


    })
        .catch(() => {
            console.log("unble to create new user")
            newUser = {
                "errors": {
                    "body": [
                        "user can not be created"
                    ]
                }
            }
        })

    return newUser




}



module.exports = { createNewUser }