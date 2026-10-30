const { SlashCommandBuilder, ChannelType } = require("discord.js");
const SubcommandUtils = require("../../utils/subcommand-utils");

const _command = {
     data: new SlashCommandBuilder()
          .setName("jal")
          .setDescription("Group of Joins And Leaves commands.")
          .addSubcommand(subcommand => subcommand
               .setName("setchannel")
               .setDescription("Sets the channel for join and leave messages.")
               .addChannelOption(option => option
                    .setName("channel")
                    .setDescription("The channel to send the messages in.")
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
               )
          )
}

_command.execute = SubcommandUtils.createExecute(__dirname, _command);

module.exports = _command;
