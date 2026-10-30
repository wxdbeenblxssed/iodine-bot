const { SlashCommandBuilder } = require("discord.js");

const _command = {
     data: new SlashCommandBuilder()
          .setName("kick")
          .setDescription("Kicks the specified user from the server.")
          .addUserOption(option => option
               .setName("user")
               .setDescription("The user to kick from the server.")
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
     const member = guild.members.cache.get(user.id);
     
     await member.kick(reason);
     guild.addInfraction(user.id, interaction.member.user.id, "kick", reason);
}

module.exports = _command;
