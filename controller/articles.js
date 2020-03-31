const { articles, users } = require('../data/db')
const seq = require('sequelize')
const { slugify } = require('../util/slugify')


async function createNewArticle(title, description, tagList, body, authorId, user) {
    let art
    const article = await articles.create({
        slug: (slugify(title)),
        title,
        description,
        tagList,
        body,
        authorId,
        comments: [],
        favByUser: []
    })
        .then((ar) => {

            art = {
                "article": {
                    "slug": ar.slug,
                    "title": ar.title,
                    "description": ar.description,
                    "body": ar.body,
                    "tagList": ar.tagList,
                    "createdAt": ar.createdAt,
                    "updatedAt": ar.updatedAt,
                    "favorited": false,
                    "favoritesCount": 0,
                    "author": {
                        "username": user.username,
                        "bio": user.bio,
                        "image": user.image,
                        "following": false
                    }
                }
            }
        })
        .catch((ar) => {

            art = `{
                    "errors": {
                    "body": [
                        ${ar}
                    ]
                }
            }`

        })

    return art



}


async function findArticle(slug, authorId) {

    const article = await articles.findOne({
        where: {
            slug: slug,
            authorId: authorId
        },
        include: { model: users, as: "author" }

    }).catch((err) => {
        return err
    })


    return article


}



async function getLatestArticles(tags) {

    let artArray

    if (tags.slug) {

        let arti = await articles.findAll({

            where: {
                slug: tags.slug
            },
            include: { model: users, as: "author" }

        }).then((a) => { artArray = a })
            .catch((err) => {
            })


    }
    else {
        let arti = await articles.findAll({

            order: [
                ["id", "DESC"]
            ],
            limit: 20,
            include: { model: users, as: "author" }

        }).then((a) => { artArray = a })
            .catch(() => {
            })
    }




    return artArray


}


async function findArtByUser(userId) {

    let artArray = []

    let arti = await articles.findAll({

        where: {

            authorId: userId

        },
        include: { model: users, as: "author" }

    }).then((a) => {
        artArray = a
    })
        .catch(() => {
        })


    return artArray


}

async function findArtBySlug(slug) {

    let article = await articles.findOne({
        where: {
            slug: slug
        },
        include: { model: users, as: "author" }
    })
    return article



}





module.exports = { createNewArticle, findArticle, getLatestArticles, findArtByUser, findArtBySlug }
