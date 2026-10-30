const { SlashCommandBuilder } = require("discord.js");

const _command = {
     data: new SlashCommandBuilder()
          .setName("warn")
          .setDescription("Gives the spcified user a warning.")
          .addUserOption(option => option
               .setName("user")
               .setDescription("The user to grant the warning to.")
               .setRequired(true)
          )
          .addStringOption(option => option
               .setName("reason")
               .setDescription("Reason for the moderation action.")
          )
};

_command.execute = async function(interaction) {
     const user = interaction.options.getUser("user");
     const reason = interaction.options.getString("reason") ?? "No reason provided.";
     const guild = interaction.guild;

     guild.addInfraction(user.id, "warn", reason);
}

module.exports = _command;
