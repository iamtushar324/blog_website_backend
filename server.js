const exp = require('express')
const app = exp()
const { db, users, articles } = require('./data/db')
const apiRoute = require('./routes/api').route

const session = require('express-session')

app.use(
    session({
        secret: 'this is a secret password ',
        resave: false,
        saveUninitialized: true,

    })
)

app.use(exp.json())
app.use('/', exp.static(__dirname + '/public'))
app.use('/api', apiRoute)









db.sync({}).then(() => {

    app.listen(3000, () => {
        console.log("Server started")
    })




})