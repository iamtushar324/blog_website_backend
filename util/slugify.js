function slugify(name) {
    JSON.stringify(name)
    // let sName = name.toLowerCase().replace(/ /g, "-")
    let sName = name.toLowerCase().replace(/[?:'~!#$@%^& ]/g, "-")
    return sName
}

module.exports = { slugify }