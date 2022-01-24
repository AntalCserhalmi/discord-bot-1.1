const { MessageEmbed } = require("discord.js");
const discord = require("../bot/bot");

sendEmbedMessage = (channelId,title,description, fields,color, react, isReturn, footer, thumbnail) => { 
    const client = discord.getClient();
    if(typeof footer === "undefined") {
        footer = {text: "Cryptológusok", iconURL: "asd"};
    }

    const embedMessage = new MessageEmbed();
    embedMessage.setTitle(title);
    embedMessage.setDescription(description);
    if (typeof fields !== "undefined")
        embedMessage.addFields(fields);

    if (typeof thumbnail !== "undefined")
        embedMessage.setThumbnail(thumbnail);

    embedMessage.setTimestamp(new Date());
    embedMessage.setColor(color);

    if(isReturn)
        return embedMessage;

    client.channels.fetch(channelId).then(async channel => {
        await channel.send({embeds: [embedMessage]}).then(async message => {
            if (react) {
                await message.react("✅").catch(console.error);
                await message.react("❌").catch(console.error);
            }
        }).catch(console.error);
    })
};

exports.sendEmbedMessage = (client,channelId, title, description, fields, color, react, isReturn) => sendEmbedMessage(client,channelId, title, description, fields, color, react, isReturn);
