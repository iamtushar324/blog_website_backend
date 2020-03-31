const { getalltags } = require('../../controller/tags')
const route = require('express').Router()

route.get('/', async (req, res) => {

    let tags = await getalltags()

    res.send({
        "tags": tags
    })

})


module.exports = { route }


