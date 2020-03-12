const { users } = require('../data/db')
const seq = require('sequelize')


async createNewUser()=> {

    const user = await users.create({
        email: "iamtushf",
        username: "djjdjd",
        password: "djfdsj"
    })




}