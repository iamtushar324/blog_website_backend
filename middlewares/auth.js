const { users } = require('../data/db')

async function auth(req, res, next) {

    let token = false;
    let authUser = false;
    if (req.session) { token = req.session.token; }

    if (token) {


        authUser = await users.findOne({
            where: {
                token: token
            }
        })

    }

    if (authUser) { next() }

    else {
        res.send("false")
    }


}

module.exports = { auth }