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
    }).then((user) => {
        console.log("New user created")
        newUser = user.dataValues
        newUser = { user: newUser }

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