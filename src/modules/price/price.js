const http = require("superagent");
const math = require("../util/math");
const { Permissions } = require("discord.js");
const config = require("../../../config.json");
const fs = require("fs");
const path = "./modules/price/tokens.json";

let discordClient;
let tokens = [];
let intervalId;
let tokensJson = {};

fetchPrice = async (apiName, currency) => {

    const res = await http.get(`${config.price.baseUrl}/simple/price`).query({ids: apiName, vs_currencies: currency});
    return res["body"][apiName][currency];
};


triggerHttpRequests = (client) => {
    tokensJson.tokens.forEach(token => {
        fetchPrice(token["apiName"], token["currency"]).then(result => {
            changeVoiceChannelName(client, token["voiceChannelId"],token["apiName"] ,result)
        });
    });
};

changeVoiceChannelName = async (client, voiceChannelId, apiName, price) => {
    
    if (!voiceChannelId) return;
    
    const voiceChannel = await client.channels.fetch(voiceChannelId); 
    
    if (!voiceChannel) return;
    if (!voiceChannel.isVoice()) return;

    await voiceChannel.setName(
        tokens[apiName].price > price ?
        `${config.price.emotes[0]} ${tokens[apiName].label}: $${math.groupDigits(price)}`: 
        `${config.price.emotes[1]} ${tokens[apiName].label} $${math.groupDigits(price)}`
    ).catch(console.error);

    tokens[apiName].price = price;
};

timer = (client) => {
    triggerHttpRequests(client);
    intervalId = setInterval(triggerHttpRequests, 1000*60*3, client);
};


handleTokens = async (method, data) => {
    const readData = JSON.parse(fs.readFileSync(path));
    if (method === "add"){
        await discordClient.guilds.fetch(config.guild.id).then(async guild => {
            await guild.channels.create(`${data.label} $0`,{
                type: "GUILD_VOICE",
                permissionOverwrites:[
                    {
                        id: guild.roles.everyone,
                        deny: [Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                        id: config.role.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                        deny:[Permissions.FLAGS.MANAGE_CHANNELS]
                    }
                ]
            }).then(async channel => {
                await channel.setParent(config.category.id,{lockPermissions: true});
                data.voiceChannelId = channel.id;
            });
        });
        readData.tokens.push(data);
    }else if( method === "remove"){
        for (var i = 0; i < readData.tokens.length; i++){
            if (readData.tokens[i].apiName === data.apiName){
                await discordClient.guilds.fetch(config.guild.id).then(guild => {
                    guild.channels.fetch(readData.tokens[i].voiceChannelId).then(async channel => {
                        await channel.delete().catch(console.error);
                    });
                });
                readData.tokens.splice(i, 1);
                break;
            }
        }
    }

    fs.writeFileSync(path, JSON.stringify(readData, null, 2));

    clearInterval(intervalId);
    intervalId = null;
    initTokens();
};

initTokens = () => {
    tokens = [];
    tokensJson = JSON.parse(fs.readFileSync(path));
    for(var i=0; i < tokensJson.tokens.length; i++){
        tokens[tokensJson.tokens[i].apiName] = {
            label : tokensJson.tokens[i].label,
            price : 0
        }
    }
    console.log("Tokens has been initialized.")
    timer(discordClient);
};

getDiscordClient = (client) => {
    discordClient = client;
};

exports.handleTokens = (method, data) => handleTokens(method, data);
exports.initTokens = () => initTokens();
exports.getDiscordClient = (client) => getDiscordClient(client);