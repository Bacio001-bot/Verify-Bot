const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    discordid:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    verifycode:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
})

module.exports = mongoose.model('Member', MemberSchema)