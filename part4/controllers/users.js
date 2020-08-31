const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try{
        const body = request.body

        if (!body.password || body.password.length < 3){
            response.status(400).json({error : 'Invalid username or password'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const newUser = new User({
            username : body.username,
            name : body.name,
            passwordHash : passwordHash
        })

        const savedNewUser = await newUser.save()
        console.log('output',savedNewUser.toJSON())
        response.json(savedNewUser.toJSON())
    }
    catch(exception){
        next(exception)
    }

})

usersRouter.get('/', async (request, response) => {
    const users = User.find({})
    console.log('users',users)
    if (users)
        response.json(users.map(u => u.toJSON()))
    else 
        response.json({})
})

module.exports = usersRouter