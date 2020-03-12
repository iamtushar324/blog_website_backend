const exp = require('express')
const app = exp()
const { db, users, articles } = require('./data/db')
const apiRoute = require('./routes/api').route

app.use('/api', apiRoute)

db.sync().then(() => {

    app.listen(3333, () => {
        console.log("Server started")
    })

    const user = users.create({
        email: "iamtushf",
        username: "djjdjd",
        password: "djfdsj"
    })


    const art = articles.create({
        title: "iamtushf",

    })
})