const { listen } = require("../http-server/server");
const { Client, Intents } = require("discord.js");
const fs = require("fs");
const config = require("../../../config.json");
const client = new Client({intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS]});

const eventFiles = fs.readdirSync('./modules/events').filter(file => file.endsWith('.js'));

for(const file of eventFiles){
    const event = require(`../events/${file}`);
    if (event.once){
        client.once(event.name, (...args) => event.execute(...args));
    }else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

exports.getClient = () => {return client};
exports.login = () => {
    listen();
    client.login(config.token)
};