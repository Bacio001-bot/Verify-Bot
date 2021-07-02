const Member = require('../schemas/MemberSchema')

//Remove the document when the Member leaves the server
module.exports = {
    name: 'guildMemberRemove',
    async execute(bot, member, PREFIX, Discord, settings) {
        await Member.deleteMany({
            discordid: member.user.id
        })

    }
}