const price = require("../price/price");
const config = require("../../../config.json");
const { sendEmbedMessage } = require("../functions/embedMessages");

module.exports = {
    name: "ready",
    once: true,
    execute(client){
        price.getDiscordClient(client);

        client.guilds.fetch(config.guild.id).then(guild => {
            guild.commands.fetch().then(commands => {
                commands.forEach(async command => {
                    if (command.name === "addtoken" || command.name === "removetoken"){
                        await command.permissions.add({permissions: [
                            {
                                id: config.price.roles[1],
                                type: "ROLE",
                                permission: true
                            },
                            {
                                id: config.price.roles[0],
                                type: "ROLE",
                                permission: true
                            }
                        ]})
                        console.log(`Edited Command ${command.name}`);
                    }
                });
            });
        });
        
        client.channels.fetch(config.channel.ids.form).then(async channel => {
            await channel.send({embeds: [
                sendEmbedMessage(
                    "",
                    "Kedves jövendőbeli tagok!",
                    "A Discord szerverünkön semmiféle fizetős tartalom nincs. Egy pozitív, jó hangulatú közösség tagja lehetsz, cserébe viszont ki kell töltened egy jelentkezési lapot, ahol bizonyíthatod, hogy saját magad érdekében egy alapszintű tudás birtokában lépsz be. \n\nA kriptovaluták világa nem olyan egyszerű, mint amilyennek kívülről látszik. Ha rászánsz egy kis erőt, energiát nagyon sok fejfájástól és pénzveszteségtől mentheted meg magadat. Azért volt erre szükség, mert rengeteg kezdő árasztotta el nap mint nap a szervert, ugyanazokkal a kérdésekkel, és az alapszintű tudás hiányában sokan rossz címekre küldtek kriptopénzt, és az örökre elveszett! \n\nA jelenleg látható szobák elolvasása után (kezdő-guide - nft-tudástár - pro-tippek) bátran nekifuthatsz a jelentkezési lapnak, ha sikerül, gratulálunk! Alapszintű Cryptológus oklevelet szereztél, és könnyebb lesz eligazodnod a kriptovaluták világában! " +
    
                    "\n\nKérlek figyelj az alábbi szempontokra:\n" + 
                    "**1. lépés:** Kattints a reakció gombra (rakéta).\n" + 
                    "**2. lépés:** Kapsz a bot-tól egy linket, azt megnyitva találod a kérdéseket. Töltsd ki!.\n" +
                    "**3. lépés:** Küldd be nekünk és elbíráljuk!\n" +
                    "**4. lépés:** Innentől már csak türelmesen kell várnod, minden lap el lesz bírálva, ne írjatok rá emiatt senkire!\n" +
                    
                    "\n**Ha megkapjátok a rangot:**\n" +
                    "- A válaszok helyesnek bizonyultak így teljes körű tagja leszel a közösségnek\n" +
                    "- Mindent megtalálsz az adott szobákban és a pinned üzenetek között, mielőtt kérdezel olvass és nézz utána!\n" +
                    
                    "\n**Ha nem kapjátok meg a rangot: **\n" +
                    "- A válaszok rövidek voltak vagy nem bizonyultak megfelelőnek, 3 óra múlva újra próbálhatjátok.\n" +
                    
                    "\n*Ha trollkodás céljából töltöd ki, az azonnali kitiltást von maga után!*\n" +
                    
                    "\nSok szerencsét, és sikeres jövőt kívánunk!",
                    [],
                    "#5ACFF5",
                    false,
                    true,
                    {text: "A Cryptológusok csapata", iconUrl: "asd"}
                )
    
                ]}).then(async message => {
                await message.react("🚀").catch(console.error);
            });
        }).catch(console.error);
    
        client.channels.fetch(config.channel.ids.botLog).then(async channel => {
            await channel.send({embeds:[
                sendEmbedMessage(
                    "",
                    "Bot elindult!",
                    "",
                    [],
                    "#5ACFF5",
                    false,
                    true)
                ]});
        }).catch(console.error);
    
        price.initTokens(client);
        console.log("Bot has started!");
    }
};