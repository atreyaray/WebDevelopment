const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { request } = require('express')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
    console.log('router to loginrouter')
    const body = request.body
    console.log('body is',body)
    const user = await User.findOne({username: body.username})
    console.log('User',user)
    const passwordCorrect = user === null
                        ? false
                        : await bcrypt.compare(body.password, user.passwordHash)
    
    console.log('password correct', passwordCorrect)
    
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