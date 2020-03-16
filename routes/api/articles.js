const route = require('express').Router()
const { createNewArticle, findArticle, getLatestArticles } = require('../../controller/articles')
const { auth } = require('../../middlewares/auth')
const { getUserObj } = require('./user')
const { slugify } = require('../../util/slugify')







route.get('/', async (req, res) => {
    console.log(req.query)
    const articlesArray = await getLatestArticles(req.query)

    let MultiArticle = []

    for (let art of articlesArray) {



        let arti = {
            "slug": art.slug,
            "title": art.title,
            "description": art.description,
            "body": art.body,
            "tagList": ["dragons", "training"],
            "createdAt": art.createdAt,
            "updatedAt": art.updatedAt,
            "favorited": false,
            "favoritesCount": 0,
            "author": {
                "username": art.author.username,
                "bio": art.author.bio,
                "image": art.author.image,
                "following": false
            }
        }

        MultiArticle.push(arti)

    }

    JSON.stringify(MultiArticle)

    res.send({ articles: MultiArticle })




})






route.post('/', auth, async (req, res) => {

    newArticle = req.body.article

    let user = await getUserObj(req, res)
    let tagList = newArticle.tagList


    let article = await createNewArticle(newArticle.title, newArticle.description, tagList, newArticle.body, user.id, user)



    res.send(article)

})

route.put('/', auth, async (req, res) => {

    let user = await getUserObj(req, res)

    let article = await findArticle(req.query.slug, user.id)

    let upArt = req.body.article

    if (article) {

        if (upArt.title) {
            article.title = upArt.title
            article.slug = slugify(upArt.title)
        }
        if (upArt.body) {
            article.body = upArt.body
        }
        if (upArt.description) {
            article.description = upArt.description
        }

        await article.save()


        res.send(article)

    }
    else {
        res.send(`
        {
            "errors": {
                "body": [
                    "you are not authorized to change this article"
                ]
            }
        }
        `)
    }






})


route.delete('/', auth, async (req, res) => {

    let user = await getUserObj(req, res)

    let article = await findArticle(req.query.slug, user.id)

    if (article) {
        await article.destroy()
        res.send(` {
            "errors": {
            "body": [
                "article deleted"
            ]
        }
        } `)
    }
    else {
        res.send(`{
            "errors": {
            "body": [
                "unable to find the article"
            ]
        }
        } `)

    }

})


module.exports = { route }