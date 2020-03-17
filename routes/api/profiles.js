const route = require('express').Router()
const { auth } = require('../../middlewares/auth')
const { users } = require('../../data/db')
const { getUserObj } = require('./user')
const { getProfile } = require('../../controller/proflies')


route.get('/:username', auth, async (req, res) => {

    let currentUser = await getUserObj(req, res)

    let username = req.params.username

    let userPro = await getProfile(username)

    let isFollowing = false





    for (let id of currentUser.following) {
        if (id == userPro.id) isFollowing = true
    }

    userPro =
    {
        "profile": {
            "username": userPro.username,
            "bio": userPro.bio,
            "image": userPro.image,
            "following": isFollowing
        }
    }


    res.send(userPro)


})


route.post('/:username/follow', auth, async (req, res) => {

    let currentUser = await getUserObj(req, res)

    let username = req.params.username

    let userPro = await getProfile(username)

    let isFollowing = false

    for (let id of currentUser.following) {
        if (id == userPro.id) isFollowing = true
    }

    if (!isFollowing) {
        let arr = currentUser.following
        arr.push(userPro.id)
        currentUser.following = arr
        console.log(currentUser.following)
        await currentUser.save()
    }

    for (let id of currentUser.following) {
        if (id == userPro.id) isFollowing = true
    }

    userPro =
    {
        "profile": {
            "username": userPro.username,
            "bio": userPro.bio,
            "image": userPro.image,
            "following": isFollowing
        }
    }


    res.send(userPro)


})



route.delete('/:username/follow', auth, async (req, res) => {

    let currentUser = await getUserObj(req, res)

    let username = req.params.username

    let userPro = await getProfile(username)

    let isFollowing = false

    function isEqual(x) {
        return x != userPro.id
    }

    let newFol = (currentUser.following).filter(isEqual)

    currentUser.following = newFol
    await currentUser.save()

    for (let id of currentUser.following) {
        if (id == userPro.id) isFollowing = true
    }

    userPro =
    {
        "profile": {
            "username": userPro.username,
            "bio": userPro.bio,
            "image": userPro.image,
            "following": isFollowing
        }
    }


    res.send(userPro)


})




module.exports = { route }