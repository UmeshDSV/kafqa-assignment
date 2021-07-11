const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.send("Kafqa-assignment")
})

router.get('/user/get', async (req, res) => {
    try {
        var searchParameter = {}
        if (req.query.name) {
            searchParameter["type"] = "name"
            searchParameter["value"] = req.query.name
        } else if (req.query.phone) {
            searchParameter["type"] = "phone"
            searchParameter["value"] = req.query.phone
        } else if (req.query.email) {
            searchParameter["type"] = "email"
            searchParameter["value"] = req.query.email
        }
        if (searchParameter.type) {
            var result = await User.fetchData(searchParameter)
            res.send(result)
        } else {
            res.status(404).send({ error: "Please provide valid search parameter" })
        }
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

router.post('/user/create', async (req, res) => {
    try {
        var result = await User.insertData(req.body.name, req.body.email, req.body.phone, req.body.address)
        if (result.changes > 0) {
            res.send(result)
        } else {
            res.send("Cannot create user")
        }
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

router.delete('/user/delete/:userid', async (req, res) => {
    try {
        var result = await User.deleteData(req.params.userid)
        if (result.changes > 0) {
            res.send(result)
        } else {
            res.send("Cannot delete user")
        }
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

router.patch('/user/update/:userid', async (req, res) => {
    try {
        var result = await User.updateData(req.params.userid, req.body)
        if (result.changes > 0) {
            res.send(result)
        } else {
            res.send("Cannot update user")
        }
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

router.get('/user/getAll', async (req, res) => {
    try {
        var result = await User.fetchAllUsers()
        res.send(result)
    } catch (e) {
        res.status(400).send({ error: e })
    }

})
module.exports = router