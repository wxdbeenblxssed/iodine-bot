const { SlashCommandBuilder } = require("discord.js");

const _command = {
     data: new SlashCommandBuilder()
          .setName("ban")
          .setDescription("Bans the specified user from the server.")
          .addUserOption(option => option
               .setName("user")
               .setDescription("The user to ban from the server.")
               .setRequired(true)
          )
          .addStringOption(option => option
               .setName("reason")
               .setDescription("Reason for the moderation action.")
          )
          .addBooleanOption(option => option
               .setName("flush")
               .setDescription("Delete the user's last week of message history.")
          )
};

_command.execute = async function(interaction) {
     const user = interaction.options.getUser("user");
     const reason = interaction.options.getString("reason") ?? "No reason provided.";
     const isFlush = interaction.options.getBoolean("flush");
     
     const guild = interaction.guild;
     const member = guild.members.cache.get(user.id);
     let deleteSeconds = 0;

     if (isFlush) deleteSeconds = 604800;

     await member.ban({ deleteMessageSeconds: deleteSeconds, reason: reason }).then(() => {
          guild.addInfraction(user.id, "ban", reason);
     });
}

module.exports = _command;
