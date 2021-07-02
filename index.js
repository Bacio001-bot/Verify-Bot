const Discord = require('discord.js');
const PREFIX = "v$";
const fs = require('fs');
const { token } = require('./config.json')
const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

//General settings the bot will be using
const settings = require("./settings.json")

//MongoDb Connect string
const { string } = require('./string.json')

//Mongoose Package (npm i mongoose)
const mongoose = require('mongoose')

mongoose.connect(string, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

//Commands Handler
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
bot.commands = new Discord.Collection();
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);

    bot.commands.set(command.name, command)
}

//Events Handler
const eventFiles = fs.readdirSync('./Events/').filter(file => file.endsWith('.js'));
bot.events = new Discord.Collection();
for (const file of eventFiles) {
    const event = require(`./Events/${file}`);

    bot.events.set(event.name, event)
}

//When the bot gets put online
bot.on('ready', () => {
    bot.events.get('ready').execute(bot, PREFIX);
});

//When the bot recieves a message
bot.on('message', async (message) => {
    bot.events.get('message').execute(bot, message, PREFIX, Discord, settings);
})

//When the bot joins a guild
bot.on("guildCreate", (guild) => {
    bot.events.get('guildCreate').execute(guild);
})

//When the bto leaves a guild
bot.on("guildDelete", (guild) => {
    bot.events.get('guildDelete').execute(guild);
})

//When a button gets clicked
bot.on('clickButton', (button) => {
    bot.events.get('clickButton').execute(bot, button, PREFIX, Discord, settings);
})

//When a member joins the server
bot.on('guildMemberAdd', (member) => {
    bot.events.get('guildMemberAdd').execute(bot, member, PREFIX, Discord, settings);
});

//When a member leaves the server
bot.on('guildMemberRemove',  (member) => {
    bot.events.get('guildMemberRemove').execute(bot, member, PREFIX, Discord, settings);
});


bot.login(token);