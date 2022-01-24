const price = require("../price/price");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction){
        if (!interaction.isCommand()) return;
    
        const { commandName } = interaction;
        const { options } = interaction;
        try{
            if (commandName === "addtoken"){
                await interaction.deferReply({ephemeral: true});
                price.handleTokens("add", {apiName: options.getString("apiname"),label: options.getString("label"),currency: options.getString("currency")});
                await interaction.editReply("Sikeresen hozzáadtad a tokent a figyelőlistához.");
            
            }else if (commandName === "removetoken"){
                await interaction.deferReply({ephemeral: true});
                price.handleTokens("remove", {apiName: options.getString("apiname")});
                await interaction.editReply("Sikeresen eltávolítottad a tokent a figyelőlistáról.");
            }
        }catch(error){
            console.error(error);
        }
    }
}