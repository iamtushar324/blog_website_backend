const { users } = require('../data/db')
const seq = require('sequelize')
const { random_gen } = require('../util/token_gen')


async createNewUser(email, username, password)=> {

    const user = await users.create({
        email: "iamtushf",
        username: "djjdjd",
        password: "djfdsj",
        token: random_gen(30)
    }).then(() => console.log("New user created"))
        .catch(() => {
            console.log("unble to create new user")
        })




}
