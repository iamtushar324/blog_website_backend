const { users } = require('../data/db')


async function getProfile(proUsername) {

    const pro = await users.findOne({
        where: {
            username: proUsername
        }
    })

    return pro

}

module.exports = { getProfile }