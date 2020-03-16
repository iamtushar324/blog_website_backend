const Seq = require('sequelize')

const db = new Seq({
    dialect: "mysql",
    database: "blog_website",
    username: "blog_website",
    password: "classmateblog",

})

const users = db.define('users', {

    "email": {
        type: Seq.STRING(40),
        priamaryKey: true,
        allowNull: false,
        unique: true

    },
    "username": {
        type: Seq.STRING(40),
        allowNull: false,
        unique: true

    },

    "password": {
        type: Seq.STRING(120),
        allowNull: false

    },

    "token": {
        type: Seq.TEXT,
        allowNull: false,


    },


    "bio": {
        type: Seq.STRING(100),
        defaultValue: null

    },
    "image": {
        type: Seq.STRING(200),
        defaultValue: null

    }


}, { timestamp: false })

const articles = db.define('articles', {

    "slug": {
        type: Seq.STRING(100),
        allowNull: false,
        unique: true
    },


    "title": {
        type: Seq.STRING(100),
        allowNull: false,
        unique: true
    },
    "description": {
        type: Seq.STRING(50),

    },
    "body": {
        type: Seq.TEXT,

    },
    "tagList": {
        type: Seq.TEXT,
        get() {
            return this.getDataValue('tagList').split(';')
        },
        set(val) {
            this.setDataValue('tagList', val.join(';'));
        },
    }


})

articles.belongsTo(users, { as: "author" })

module.exports = { db, users, articles }