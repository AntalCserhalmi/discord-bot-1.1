const config = require("../../../config.json");
const { sendEmbedMessage } = require("../functions/embedMessages");
const { addRole } = require("../functions/roleFunctions");
const { encrypt } = require("../crypto/crypto");

module.exports = {
    name: "messageReactionAdd",
    once: false,
    async execute(reaction, user){
        const client = await reaction.client;
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
    
        if (user.bot) return;
        if (!reaction.message.guild) return ;
    
        if (reaction.emoji.name === "✅"){
            client.channels.fetch(config.channel.ids.judge).then(async () => {
                if (reaction.count >= config.reactions.count){
                    try{
                        await addRole(reaction.message.embeds[0].fields[8].value.substring(2,20));
                        const embedMessage = reaction.message.embeds[0];
                        embedMessage.setTitle("Elfogadva!");
                        embedMessage.setColor("#00c911");
                        embedMessage.fields.push({name: "Legutóbbi javító", value: `<@${user.id}>`});
        
                        client.channels.fetch(config.channel.ids.log).then(async channel => {
                            await channel.send({embeds: [embedMessage]}).catch(console.error);
                        }).catch(console.error);
                    
                        const targetUser = await client.users.fetch(reaction.message.embeds[0].fields[8].value.substring(2,20)).catch(() => null);
                        reaction.message.embeds[0].fields[8].value = `${targetUser.tag} - <@${targetUser.id}>`;
                    
                        if (targetUser !== null)
                            targetUser.send({embeds: [
                                sendEmbedMessage(
                                    "", 
                                    "Sikeres jelentkezés!", 
                                    "Szia! \n\n Jelentkezésed elfogadásra került! \n\nJó időtöltést a szerveren!",
                                    [],
                                    "#00c911", 
                                    false, 
                                    true
                                )
                            ]}).catch(console.error);
                            
                        await reaction.message.delete({timeout: 10000}).catch(console.error);
                    }catch(err){
                        await reaction.message.delete({timeout: 10000}).catch(console.error);
                    }
                }
            });
        }else if(reaction.emoji.name === "❌"){
            client.channels.fetch(config.channel.ids.judge).then(async () => {
                if (reaction.count >= config.reactions.count){
                    try{
                        const targetUser = await client.users.fetch(reaction.message.embeds[0].fields[8].value.substring(2,20)).catch(() => null);
                        
                        reaction.message.embeds[0].fields[8].value = `${targetUser.tag} - <@${targetUser.id}>`;
                        
                        client.channels.fetch(config.channel.ids.log).then(async channel => {
        
                            const embedMessage = reaction.message.embeds[0];
                            embedMessage.setTitle("Elutasítva!");
                            embedMessage.setColor("#c90000");
                            embedMessage.fields.push({name: "Legutóbbi javító", value: `<@${user.id}>`});
                            await channel.send({embeds: [embedMessage]}).catch(console.error);
                        }).catch(console.error)
        
        
                        if (targetUser !== null)
                            targetUser.send({embeds: [
                                sendEmbedMessage(
                                    "", 
                                    "Sikertelen jelentkezés!", 
                                    "Szia! \n\n Jelentkezésed sajnos nem sikerült! \n\nKérünk téged, hogy olvass még utána a dolgoknak, és próbálkozz újra 3 óra múlva! \n\nSok sikert!",
                                    [],
                                    "#c90000", 
                                    false, 
                                    true
                                )
                            ]}).catch(console.error);
                        
                        await reaction.message.delete({timeout: 10000}).catch(console.error);
                    }catch(err){
                        await reaction.message.delete({timeout: 10000}).catch(console.error);
                    }
                }
            })
        }else if (reaction.emoji.name === "🚀"){
            client.channels.fetch(config.channel.ids.form).then(async () => {
                await user.send({embeds: [
                    sendEmbedMessage(
                        "",
                        "Jelentkezési lap",
                        "",
                        {name: "Szia!", value: `A jelentkezési lapodat itt érheted el! \n https://cryptologusok.hu/form/${encrypt(user.id)}`},
                        "#3498db",
                        false,
                        true)
                    ]}).catch(console.error);
    
                await reaction.message.reactions.resolve("🚀").users.remove(user.id).catch(console.error);
            })
        }    
    }
}