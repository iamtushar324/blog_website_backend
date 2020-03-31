const { articles } = require('../data/db')

async function getalltags() {

    let allarticles = await articles.findAll({

    })

    allarticles = allarticles.map((r) => {
        return r.tagList
    })
    let alltags = []

    allarticles.map((r) => {
        for (let l of r) {
            let c = alltags.indexOf(l)
            if (c == -1) {
                alltags.push(l)
            }
            else { }
        }
    })

    return alltags

}

module.exports = { getalltags }