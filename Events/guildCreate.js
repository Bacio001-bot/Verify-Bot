const Guild = require('../schemas/GuildSchema')

//Create a mongodb document with the default values when the bot joins the server
module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        await Guild.create({
            guildid: guild.id,
            verifyrole: "null",
            verifystatus: false
        })
    }
}