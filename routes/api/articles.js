const route = require('express').Router()
const { createNewArticle, findArticle, getLatestArticles, findArtByUser, findArtBySlug, addToFav } = require('../../controller/articles')
const { auth } = require('../../middlewares/auth')
const { getUserObj } = require('./user')
const { slugify } = require('../../util/slugify')
const { createComment, findComments, findComntWithId } = require('../../controller/comments')







route.get('/', async (req, res) => {
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

route.put('/:slug', auth, async (req, res) => {

    let user = await getUserObj(req, res).catch((err) => {
        res.send(err)
    })
    try {
        let article = await findArticle(req.params.slug, user.id).catch((err) => {
            res.send(err)
        })

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


            res.send({
                "article": {
                    "slug": article.slug,
                    "title": article.title,
                    "description": article.description,
                    "body": article.body,
                    "tagList": article.tagList,
                    "createdAt": article.createdAt,
                    "updatedAt": article.updatedAt,
                    "favorited": isFav(article.favByUser, user.id),
                    "favoritesCount": article.favByUser.length,
                    "author": {
                        "username": article.author.username,
                        "bio": article.author.bio,
                        "image": article.author.image,
                        "following": isFollowing(user.following, article.authorId)
                    }
                }
            })

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

    }

    catch (err) {
        res.send(err)
    }




})


route.delete('/:slug', auth, async (req, res) => {

    let user = await getUserObj(req, res)

    let article = await findArticle(req.params.slug, user.id)

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


route.get('/feed', auth, async (req, res) => {

    let currentUser = await getUserObj(req, res)

    let artArr = []

    let count = 0;

    for (let id of currentUser.following) {

        let tempArt = await findArtByUser(id)

        for (let art of tempArt) {

            art = {
                "slug": art.slug,
                "title": art.title,
                "description": art.title,
                "body": art.body,
                "tagList": art.tagList,
                "createdAt": art.createdAt,
                "updatedAt": art.updatedAt,
                "favorited": false,
                "favoritesCount": 0,
                "author": {
                    "username": art.author.username,
                    "bio": art.author.bio,
                    "image": art.author.image,
                    "following": art.author.image
                }
            }
            count++
            artArr.push(art)
        }

    }


    res.send({
        "articles": artArr,
        "articlesCount": count
    })





})


route.post('/:slug/comments', auth, async (req, res) => {

    let currentUser = await getUserObj(req, res)

    let currentArticle = await findArtBySlug(req.params.slug)

    let comment = await createComment(currentUser.id, currentArticle.id, req.body.comment.body)

    comment = {
        "comment": {
            "id": comment.id,
            "createdAt": comment.createdAt,
            "updatedAt": comment.updatedAt,
            "body": comment.body,
            "author": {
                "username": currentUser.username,
                "bio": currentUser.bio,
                "image": currentUser.image,
                "following": false
            }
        }
    }

    res.send(comment)

})


route.get('/:slug/comments', async (req, res) => {

    let commentArr = []

    let articleId = await findArtBySlug(req.params.slug)

    const artComment = await findComments(articleId.id)

    for (let comnt of artComment) {

        let temp =
        {
            "id": comnt.id,
            "createdAt": comnt.createdAt,
            "updatedAt": comnt.updatedAt,
            "body": comnt.body,
            "author": {
                "username": comnt.author.username,
                "bio": comnt.author.bio,
                "image": comnt.author.image,
                "following": false
            }



        }
        commentArr.push(temp)

    }


    res.send(commentArr)






})



route.delete('/:slug/comments/:id', auth, async (req, res) => {

    let comment = await findComntWithId(req.params.id)

    let currentUser = await getUserObj(req, res)



    if (currentUser.id == comment.authorId) {
        comment.destroy()
        await comment.save()
        res.send("done")

    }

    else {
        res.send({
            "errors": {
                "body": [
                    "You can not delete this comment"
                ]
            }
        })
    }



})



route.post('/:slug/favorite', auth, async (req, res) => {

    let currentUser = await getUserObj(req, res)

    let article = await findArtBySlug(req.params.slug)


    let favByuserlist = article.favByUser

    let found = favByuserlist.find((r) => { return (r == currentUser.id) })


    if (found);

    else favByuserlist.push(currentUser.id)

    article.favByUser = favByuserlist

    await article.save()

    let favList = currentUser.favArt

    favList.push(article.id)

    currentUser.favArt = favList

    await currentUser.save()

    res.send({
        "article": {
            "slug": article.slug,
            "title": article.title,
            "description": article.description,
            "body": article.body,
            "tagList": article.tagList,
            "createdAt": article.createdAt,
            "updatedAt": article.updatedAt,
            "favorited": isFav(article.favByUser, currentUser.id),
            "favoritesCount": article.favByUser.length,
            "author": {
                "username": article.author.username,
                "bio": article.author.bio,
                "image": article.author.image,
                "following": isFollowing(currentUser.following, article.authorId)
            }
        }
    })




})


route.delete('/:slug/favorite', auth, async (req, res) => {

    let currentUser = await getUserObj(req, res)

    let article = await findArtBySlug(req.params.slug)


    let favByuserlist = article.favByUser
    favByuserlist = favByuserlist.filter((Id) => {

        if (Id == currentUser.id) return false;
        else return true;
    })
    article.favByUser = favByuserlist
    await article.save()

    let favList = currentUser.favArt

    favList.push(article.id)

    currentUser.favArt = favList

    await currentUser.save()

    res.send({
        "article": {
            "slug": article.slug,
            "title": article.title,
            "description": article.description,
            "body": article.body,
            "tagList": article.tagList,
            "createdAt": article.createdAt,
            "updatedAt": article.updatedAt,
            "favorited": isFav(article.favByUser, currentUser.id),
            "favoritesCount": article.favByUser.length,
            "author": {
                "username": article.author.username,
                "bio": article.author.bio,
                "image": article.author.image,
                "following": isFollowing(currentUser.following, article.authorId)
            }
        }
    })




})



function isFav(favByUser, userId) {
    let i = false;
    for (let p in favByUser) {

        if (p == userId) i = true;
    }
    return i;
}

function isFollowing(userList, author) {
    let i = false;
    for (let p in userList) {
        if (p == author) i = true;

    }
    return i;
}


route.get('/:slug', async (req, res) => {

    let article = await findArtBySlug(req.params.slug)

    let currentUser = await getUserObj(req, res)

    if (currentUser) {

        res.send({
            "article": {
                "slug": article.slug,
                "title": article.title,
                "description": article.description,
                "body": article.body,
                "tagList": article.tagList,
                "createdAt": article.createdAt,
                "updatedAt": article.updatedAt,
                "favorited": isFav(article.favByUser, currentUser.id),
                "favoritesCount": article.favByUser.length,
                "author": {
                    "username": article.author.username,
                    "bio": article.author.bio,
                    "image": article.author.image,
                    "following": isFollowing(currentUser.following, article.authorId)
                }
            }
        })

    }

    else {
        res.send({
            "article": {
                "slug": article.slug,
                "title": article.title,
                "description": article.description,
                "body": article.body,
                "tagList": article.tagList,
                "createdAt": article.createdAt,
                "updatedAt": article.updatedAt,
                "favorited": false,
                "favoritesCount": article.favByUser.length,
                "author": {
                    "username": article.author.username,
                    "bio": article.author.bio,
                    "image": article.author.image,
                    "following": false
                }
            }
        })
    }




})






module.exports = { route }