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

module.exports = { createComment, findComments }