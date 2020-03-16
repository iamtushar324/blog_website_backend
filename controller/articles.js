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
        authorId
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
            console.log(ar)
            //         `{
            //         "errors": {
            //         "body": [
            //             "title already exist"
            //         ]
            //     }
            // }`

        })

    return art



}


async function findArticle(slug, authorId) {
    let art
    const article = await articles.findOne({
        where: {
            slug: slug,
            authorId: authorId
        }
    }).then((ar) => {
        art = ar
    })
        .catch(() => {
            art = `{
            "errors": {
            "body": [
                "You can not change this article"
            ]
        }
    }`

        })


    return art


}



async function getLatestArticles(tags) {

    let artArray
    console.log(tags)

    if (tags.slug) {

        let arti = await articles.findAll({

            where: {
                slug: tags.slug
            },
            include: { model: users, as: "author" }

        }).then((a) => { artArray = a })
            .catch(() => {
                console.log("unable to find articles")
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
                console.log("unable to find articles")
            })
    }




    return artArray


}




module.exports = { createNewArticle, findArticle, getLatestArticles }
