const path = require("node:path");
const fs = require("node:fs");

const CommandUtils = {};

const commandsPath = path.join(__dirname, "..", "commands");
const commandFiles = fs.readdirSync(commandsPath);

CommandUtils.fetchCommands = function() {
     const fetchedCommands = [];

     for (const file of commandFiles) {
          const filePath = path.join(commandsPath, file);
          const command = require(filePath);

          if ("data" in command && "execute" in command) {
               fetchedCommands.push(command);
          } else {
               LoggingLibrary.warn(`The command at ${file} is missing required properties.`);
          }
     }

     return fetchedCommands;
}

module.exports = CommandUtils;
