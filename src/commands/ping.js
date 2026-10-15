const { SlashCommandBuilder } = require("discord.js");

const Ping = {
     data: new SlashCommandBuilder().setName("ping")
          .setDescription("Replies with Pong! Used for testing purposes.")
};

Ping.execute = async function(interaction) {
     await interaction.reply("Pong!");
}

module.exports = Ping;
