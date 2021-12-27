const Seq = require('sequelize')
const dotenv = require("dotenv")
dotenv.config();

const db = new Seq({
    dialect: "mysql",
    database: "blog_website",
    username: process.env.db_username,
    password: process.env.db_password,
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

    },

    "following": {
        type: Seq.TEXT,

        get() {
            return this.getDataValue('following').split(';')
        },
        set(val) {
            this.setDataValue('following', val.join(';'));
        },

        defaultValue: []

    },


    "favArt": {
        type: Seq.TEXT,

        get() {
            return this.getDataValue('favArt').split(';')
        },
        set(val) {
            this.setDataValue('favArt', val.join(';'));
        },

        defaultValue: []

    },




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
        defaultValue: []
    },
    "comments": {
        type: Seq.TEXT,
        get() {
            return this.getDataValue('comments').split(';')
        },
        set(val) {
            this.setDataValue('comments', val.join(';'));
        },
        defaultValue: []
    },

    "favByUser": {
        type: Seq.TEXT,

        get() {
            return this.getDataValue('favByUser').split(';')
        },
        set(val) {
            this.setDataValue('favByUser', val.join(';'));
        },

        defaultValue: []

    },


})


const comments = db.define('comments', {

    body: {
        type: Seq.STRING(100),
        allowNull: false
    },

    articleId: {
        type: Seq.INTEGER,
        allowNull: false,

    }



})



comments.belongsTo(users, { as: "author" })

articles.belongsTo(users, { as: "author" })

module.exports = { db, users, articles, comments }
