const exp = require('express')
const app = exp()
const { db, users, articles } = require('./data/db')
const apiRoute = require('./routes/api').route
const { auth } = require('./middlewares/auth')


app.use(exp.json())
app.use('/', exp.static(__dirname + '/public'))

app.use('/api', apiRoute)


app.post('/check', auth)



db.sync({}).then(() => {

    app.listen(3000, () => {
        console.log("Server started")
    })




})