const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { isUserRegistered, registerUser } = require('../utils/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Deletes user data!'),
	async execute(interaction) {
        if (isUserRegistered(interaction.user.id)) {
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('delete')
					.setLabel('Yes delete my data')
					.setStyle('DANGER'),
                new MessageButton()
					.setCustomId('cancel')
					.setLabel('Cancel')
					.setStyle('SECONDARY')
			);
            await interaction.reply({ content: `Are you sure you want to delete your data?`, components: [row], ephemeral: true });
        } else {
            const content = `No data to delete, if you wish to register use the /register command`
            await interaction.reply({ content, ephemeral: true  });
        }
	},
};
