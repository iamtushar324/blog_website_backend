const { users } = require('../data/db')

async function auth(req, res, next) {
    let token = req.headers['authorization']
    toString(token)

    if (token && token.startsWith('Token ')) {
        let tokenValue = token.slice(6, token.length)
        let authUser = await users.findOne({
            where: {
                token: tokenValue
            }
        })
            .then((ans) => {
                if (ans) {


                    next()
                }
                else {
                    res.send(`{
                        "errors":{
                          "body": [
                            "user not found"
                          ]
                        }
                      }`)
                }
            })
            .catch(() => {
                console.log("token auth error")
            })

    }


}

module.exports = { auth }