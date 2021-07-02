const Member = require('../schemas/MemberSchema')

//Add a document when the Member leaves the server
module.exports = {
    name: 'guildMemberAdd',
    async execute(bot, member, PREFIX, Discord, settings) {

        //Create a random code
        let code = Math.random().toString().substr(2, 8)

        //Insert it into the member document
        await Member.create({
            discordid: member.user.id,
            verifycode: code,
        })

        member.user.send(`To verify type \`${PREFIX}verify ${code}\``)
    }
}