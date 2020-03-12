const { users } = require('../data/db')
const seq = require('sequelize')


async createNewArticle(email, username, password)=> {

    const user = await users.create({
        email: "iamtushf",
        username: "djjdjd",
        password: "djfdsj"
    }).then(() => console.log("New user created"))
        .catch(() => {
            console.log("unble to create new user")
        })




}
