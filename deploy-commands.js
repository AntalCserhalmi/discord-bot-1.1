const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("./config.json");


const commands = [
	new SlashCommandBuilder()
		.setName("addtoken")
		.setDescription("Add token to display its price")
		.addStringOption(option => 
			option.setName("apiname").setDescription("Token's API name from Coingecho").setRequired(true)
		)
		.addStringOption(option => 
			option.setName("label").setDescription("Token's display label").setRequired(true)
		)
		.addStringOption(option => 
			option.setName("currency").setDescription("Display currency like USD, or EUR").setRequired(true)
		)
		.setDefaultPermission(false),
	new SlashCommandBuilder()
		.setName("removetoken")
		.setDescription("Remove token")
		.addStringOption(option => 
			option.setName("apiname").setDescription("Token's API name from Coingecho").setRequired(true)
		)
		.setDefaultPermission(false)
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.token);

rest.put(Routes.applicationGuildCommands(config.client.id, config.guild.id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);