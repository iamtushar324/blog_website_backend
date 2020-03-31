const { comments, articles, users } = require('../data/db')


async function createComment(userId, articleId, body) {

    const comment = await comments.create({
        body: body,
        articleId: articleId,
        authorId: userId

    })

    return comment



}

async function findComments(articleId) {

    const commentList = await comments.findAll({
        where: {
            articleId: articleId
        }
        ,
        include: { model: users, as: "author" }
    })

    return commentList




}

async function findComntWithId(id) {
    const comment = await comments.findOne({
        where: {
            id: id
        }
    })

    return comment
}

module.exports = { createComment, findComments, findComntWithId }