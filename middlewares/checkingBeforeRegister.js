const { users } = require('../data/db')


async function checkBeforeReg(req, res, next) {


    let user = req.body.user

    let regEmail = await users.findOne({
        where: {
            email: user.email
        }
    })
        .then((u) => {
            if (!u) { }
            else {
                console.log(u)
                res.send(`{
                "errors": {
                    "body": [
                        "Email already registered "
                    ]
                }
              }`)
            }
        })
        .catch(() => {
            res.send(`{
                "errors": {
                    "body": [
                        "Email already registered "
                    ]
                }
              }`)

        })


    let regUser = await users.findOne({
        where: {
            username: user.username
        }
    })
        .then((u) => {
            if (!u) { }
            else {
                res.send(`{
            "errors": {
                "body": [
                    "User name already exits "
                ]
            }
          }`)
            }
        })
        .catch(() => {
            res.send(`{
        "errors": {
            "body": [
                "User name already exits "
            ]
        }
      }`)
        })
    next()

}

module.exports = { checkBeforeReg }