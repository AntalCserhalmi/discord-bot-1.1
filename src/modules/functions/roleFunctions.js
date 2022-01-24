const config = require("../../../config.json");
const discord = require("../bot/bot");

addRole = async (id) => {
    const client = discord.getClient();
    let guild = client.guilds.cache.get(config.guild.id);
    guild.members.fetch(id).then(async member => {
        await member.roles.add(config.role.id).catch(console.error);
    });
};

exports.addRole = (id) => addRole(id);