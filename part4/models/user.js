const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : String,
    name : String,
    passwordHash : String,
    blogs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Note'
        },
    ]
})

userSchema.set('toJSON',{
    transform : (document, returnedObject) => {
     returnedObject.id = returnedObject._id
     delete returnedObject._id
    delete returnedObject.__v
     delete returnedObject.passwordHash
     delete returnedObject.blogs
    }
})

module.exports = mongoose.model('User', userSchema)
