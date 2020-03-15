const { users } = require('../data/db')

function auth(req, res, next) {
    let token = req.headers['authorization']
    toString(token)
    console.log(token)
    if (token && token.startsWith('Token ')) {
        let tokenValue = token.slice(6, token.length)
        let authUser = users.findOne({
            where: {
                token: tokenValue
            }
        })
            .then((ans) => {
                if (ans) {
                    res.send("yes")
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