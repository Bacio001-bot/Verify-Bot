const mongoose = require('mongoose')

const GuildSchema = new mongoose.Schema({

    guildid:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    verifyrole:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    verifystatus:{
        type: mongoose.SchemaTypes.Boolean,
        required: true,
    },

})

module.exports = mongoose.model('Guild', GuildSchema)