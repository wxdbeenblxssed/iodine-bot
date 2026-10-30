const { SlashCommandBuilder, ChannelType, subtext } = require("discord.js");
const SubcommandUtils = require("../../utils/subcommand-utils");

const _command = {
     data: new SlashCommandBuilder()
          .setName("jtc")
          .setDescription("Group of Join To Create commands.")
          .addSubcommand(subcommand => subcommand
               .setName("setcategory")
               .setDescription("Sets the category of the personal channels.")
               .addChannelOption(option => option
                    .setName("category")
                    .setDescription("The category personal channels will be created in.")
                    .addChannelTypes(ChannelType.GuildCategory)
                    .setRequired(true)
               )
          )
          .addSubcommand(subcommand => subcommand
               .setName("setformat")
               .setDescription("The formatting of the newly created channels.")
               .addStringOption(option => option
                    .setName("schema")
                    .setDescription("The schema of the formatting. Use %name% to input the channel name.")
                    .setRequired(true)
               )
          )
          .addSubcommand(subcommand => subcommand
               .setName("setname")
               .setDescription("Sets the name of the channel you're currently in (Ownership Required).")
               .addStringOption(option => option
                    .setName("name")
                    .setDescription("The new name of the channel.")
                    .setRequired(true)
               )
          )
};

_command.execute = SubcommandUtils.createExecute(__dirname, _command);

module.exports = _command;
