const Guild = require('../schemas/GuildSchema')

module.exports = {
    name: 'settings',
    async execute(bot, message, PREFIX, Discord, settings, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You do not have the right permissions`)

        if (args[1].toLowerCase() == `verifytoggle` && args[2].toLowerCase() == `on` || args[2].toLowerCase() == `enable`) {

            //Update status to true where guild id is id
            await Guild.findOneAndUpdate({
                guildid: message.guild.id
            }, {
                verifystatus: true
            })

            message.channel.send(`Verifications have been enabled`)

        }

        if (args[1].toLowerCase() == `verifytoggle` && args[2].toLowerCase() == `off` || args[2].toLowerCase() == `disable`) {

            //Update status to false where guild id is id
            await Guild.findOneAndUpdate({
                guildid: message.guild.id
            }, {
                verifystatus: false
            })

            message.channel.send(`Verifications have been disabled`)

        }

        if (args[1].toLowerCase() == `verifyrole`) {

            let role = message.guild.roles.cache.find(dbrole => dbrole.id === args[2])

            if (!role) return message.channel.send(`You didn't supply a valid role`)
            
            //Update role to role id where guild id is id
            await Guild.findOneAndUpdate({
                guildid: message.guild.id
            }, {
                verifyrole: role.id
            })

            message.channel.send(`the new verification role is \`${role.name}\``)

        }
        
        
    }

}