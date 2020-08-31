const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        minlength: 3 
    },
    name : String,
    passwordHash : {
        type: String,
    },
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
