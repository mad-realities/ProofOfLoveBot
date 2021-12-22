const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// grabs secrets from .env file and creates variables for them
const dotenv = require('dotenv');
dotenv.config();

token = process.env.DISCORD_TOKEN;
client_id = process.env.CLIENT_ID;
guild_id = process.env.GUILD_ID;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('profile').setDescription('Generates your web3 profile card!')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
