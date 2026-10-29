const path = require("node:path");
const fs = require("node:fs");
const LoggingUtils = require("../utils/logging-utils");

const _module = {};

_module.createExecute = function(dirName, command) {
     return async function(interaction) {
          const subcommandName = interaction.options.getSubcommand();
          const subcommandFile = path.join(dirName, "subcommands", `${command.data.name}-${subcommandName}.js`);

          if (!fs.existsSync(subcommandFile)) {
               LoggingUtils.error(`No subcommand file exists for /${command.data.name} ${subcommandName}.`);
               return;
          }

          const subcommand = require(subcommandFile);

          if ("execute" in subcommand) {
               await subcommand.execute(interaction);
          } else {
               LoggingUtils.error(`Subcommand ${command.data.name}-${subcommandName}.js is missing required properties.`);
          }
     }
}

module.exports = _module;
