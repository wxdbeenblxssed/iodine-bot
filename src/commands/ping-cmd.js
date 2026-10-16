const { SlashCommandBuilder } = require("discord.js");

const PingCmd = {
     data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong! Used for testing purposes.")
};

PingCmd.execute = async function(interaction) {
     await interaction.reply("Pong!");
}

module.exports = PingCmd;
