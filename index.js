// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');

// grabs secrets from .env file and creates variables for them
const dotenv = require('dotenv');
const { registerUser, deleteUser } = require('./utils/database');
dotenv.config();

token = process.env.DISCORD_TOKEN;
client_id = process.env.CLIENT_ID;
guild_id = process.env.GUILD_ID;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('3bot initialized.');
});


// listens for commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;

	if (!(interaction.message.interaction.user.id === interaction.user.id)) {
		return interaction.reply({ content: 'There was an error validating the user after clicking the button, please try again!', ephemeral: true });
	}

	if (interaction.customId === "register") {
		registerUser(interaction.user.id)
		return interaction.reply({ content: 'Successfully registered user!', ephemeral: true });
	} else if (interaction.customId === "delete") {
		deleteUser(interaction.user.id)
		return interaction.reply({ content: 'Successfully deleted user!', ephemeral: true });
	} else if (interaction.customId === "cancel") {
		return interaction.reply({ content: 'Okay going away now...', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);

