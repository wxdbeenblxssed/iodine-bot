const { SlashCommandBuilder } = require("discord.js");
const SubcommandUtils = require("../../utils/subcommand-utils");

const _command = {
     data: new SlashCommandBuilder()
          .setName("memory")
          .setDescription("Group of memory handling commands.")
          .addSubcommand(subcommand => subcommand
               .setName("dump")
               .setDescription("Dumps all memory keys and their values with little formatting.")
          )
};

_command.execute = SubcommandUtils.createExecute(__dirname, _command);

module.exports = _command;
