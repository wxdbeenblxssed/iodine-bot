const { SlashCommandBuilder, ChannelType } = require("discord.js");
const SubcommandUtils = require("../../utils/subcommand-utils");

const _command = {
     data: new SlashCommandBuilder()
          .setName("logs")
          .setDescription("Group of logging related commands.")
          .addSubcommand(subcommand => subcommand
               .setName("setchannel")
               .setDescription("Sets the channel where the logs should be sent.")
               .addChannelOption(option => option
                    .setName("channel")
                    .setDescription("The target channel for logs.")
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
               )
          )
};

_command.execute = SubcommandUtils.createExecute(__dirname, _command);

module.exports = _command;
