//Include the 2 schemas from mongodb
const Guild = require('../schemas/GuildSchema')
const Member = require('../schemas/MemberSchema')

module.exports = {
    name: "verify",
    async execute(bot, message, PREFIX, Discord, settings, args) {

        const getMemberResult = async (code) => {

            //Get the member document with this member id
            let result = await Member.findOne({
                discordid: message.author.id,
                verifycode: code
            })

            //Check if document exists and code is not empty
            if (!result || result.verifycode == "null") {
                throw new Error('Member database error')
            }

        }

        const getGuildResult = async () => {

            //Get the guild document with this guild id
            let result = await Guild.findOne({
                guildid: message.guild.id
            })

            //Check if document exists and role is not empty + status is on
            if (!result || result.verifyrole == "null" || !result.verifystatus) {
                throw new Error('Guild database error')
            }

            //Get role by role id
            let role = message.guild.roles.cache.find(dbrole => dbrole.id === result.verifyrole)


            if (!role) {
                throw new Error('Role not found')
            }

            return role;

        }

        let code = args[1]
        let dbGuildResult

        //if Code is not defined
        if (!args[1]) return message.channel.send(`No valid code supplied please rejoin the server or give a valid code`)

        try {

             //Get guild results
            dbGuildResult = await getGuildResult()

        } catch (err) {

            return message.channel.send(`Verifying system haven't been properly setup or enabled`)

        }

        try {
            
            //Check if member exists with that code
            await getMemberResult(code)

        } catch (err) {

            return message.channel.send(`No valid code supplied please rejoin the server or give a valid code`)

        }

        try {

            //Add the role to the member
            await message.member.roles.add(dbGuildResult)

            //Reset the code
            await Member.findOneAndUpdate({
                discordid: message.author.id,
                verifycode: code
            }, {
                verifycode: "null"
            })

            message.channel.send(`<@!${message.author.id}> You have been verified and recieved the role \`${dbGuildResult.name}\``)

        } catch (err) {

            console.log(err)
            return message.channel.send(`Missing perms`)

        }

    }
}