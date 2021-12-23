const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { isUserRegistered, registerUser } = require('../utils/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers and confirms consent with user!'),
	async execute(interaction) {
        if (isUserRegistered(interaction.user.id)) {
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('delete')
					.setLabel('Delete Data')
					.setStyle('DANGER'),
                new MessageButton()
					.setCustomId('cancel')
					.setLabel('Cancel')
					.setStyle('SECONDARY')
			);
            await interaction.reply({ content: `Looks like you're already registered!`, components: [row], ephemeral: true });
        } else {
            const content = `In order to help match you, we need to store some data (Discord ID, tags, username, prompt responses). Please confirm your consent by clicking the button below. (You can remove your data at any time with the /delete command.)`
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('register')
					.setLabel('I Agree')
					.setStyle('SUCCESS')
			);

            await interaction.reply({ content, fetchReply: true, components: [row], ephemeral: true  });
        }
	},
};
