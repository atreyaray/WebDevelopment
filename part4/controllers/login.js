const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { request } = require('express')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    console.log('body is',body)
    const user = await User.findOne({username: body.username})
    console.log('User',user)
    const passwordCorrect = user === null
                        ? false
                        : await bcrypt.compare(body.password, user.passwordHash)
    
    if(!(user && passwordCorrect)) {
        return response
                    .status(401)
                    .json({error : 'Invalid username or password'})
    }
    const userForToken = {
        username : user.username,
        id: (await user)._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .json({token, username: user.username, name: user.name})
})

module.exports = loginRouter 