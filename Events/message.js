module.exports = {
    name: 'message',
    async execute(bot, message, PREFIX, Discord, settings) {
        let args = message.content.substring(PREFIX.length).split(" ");
        if (message.content.startsWith(PREFIX)) {
            switch (args[0].toLowerCase()) {

                case "verify":
                    bot.commands.get('verify').execute(bot, message, PREFIX, Discord, settings, args);
                    break;
                case "settings":
                    bot.commands.get('settings').execute(bot, message, PREFIX, Discord, settings, args);
                    break;

            }
        }
    }
}
