const exp = require('express')
const app = exp()
const { db, users, articles } = require('./data/db')
const apiRoute = require('./routes/api').route


app.use(exp.json())
app.use(exp.urlencoded())
app.use('/api', apiRoute)







db.sync().then(() => {

    app.listen(3333, () => {
        console.log("Server started")
    })


})