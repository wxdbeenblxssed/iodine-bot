const { SlashCommandBuilder } = require("discord.js");

const _command = {
     data: new SlashCommandBuilder()
          .setName("ping")
          .setDescription('Replies with "Pong!". Used for testing purposes.')
};

_command.execute = async function(interaction) {
     await interaction.reply("Pong!");
}

module.exports = _command;
