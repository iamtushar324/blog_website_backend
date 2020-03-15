const exp = require('express')
const app = exp()
const { db, users, articles } = require('./data/db')
const apiRoute = require('./routes/api').route
const { auth } = require('./middlewares/auth')


app.use(exp.json())

app.use('/api', apiRoute)


app.post('/check', auth)



db.sync({}).then(() => {

    app.listen(3333, () => {
        console.log("Server started")
    })




})