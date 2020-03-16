function slugify(name) {
    JSON.stringify(name)
    let sName = name.toLowerCase().replace(/ /g, "-")
    return sName
}

module.exports = { slugify }