const Guild = require('../schemas/GuildSchema')

//Delete the document when the bot leaves the server
module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        await Guild.deleteMany({
            guildid: guild.id
        })
    }
}