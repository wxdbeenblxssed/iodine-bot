const { Events, Collection } = require("discord.js");
const CommandUtils = require("../utils/command-utils");
const LoggingUtils = require("../utils/logging-utils");

const _module = {
     name: Events.InteractionCreate,
     isOnce: false
};

const fetchedCommands = CommandUtils.fetchCommands();

_module.init = function(client) {
     client.commands = new Collection();

     fetchedCommands.forEach(command => {
          client.commands.set(command.data.name, command);
     });
}

_module.execute = async function(interaction) {
     if (!interaction.isChatInputCommand()) return;

     const commandName = interaction.commandName
     const command = interaction.client.commands.get(commandName);

     if (!command) {
          LoggingUtils.error(`No command matching ${commandName} was found.`);
          return;
     }

     try {
          await command.execute(interaction);
     } catch(error) {
          LoggingUtils.error(error);
     }
}

module.exports = _module;
