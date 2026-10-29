const path = require("node:path");
const fs = require("node:fs");
const LoggingUtils = require("./logging-utils");

const _module = {};

const commandsPath = path.join(__dirname, "..", "commands");
const commandFolders = fs.readdirSync(commandsPath);

function handleCommandFile(fetchedCommands, filesPath, file) {
     const filePath = path.join(filesPath, file);
     const command = require(filePath);

     if ("data" in command && "execute" in command) {
          fetchedCommands.push(command);
     } else {
          LoggingUtils.warn(`The command at ${file} is missing required properties.`);
     }
}

_module.fetchCommands = function() {
     const fetchedCommands = [];

     commandFolders.forEach(folder => {
          const filesPath = path.join(commandsPath, folder);
          const commandFiles = fs.readdirSync(filesPath).filter((file) => file.endsWith(".js"));

          commandFiles.forEach(file => {
               handleCommandFile(fetchedCommands, filesPath, file);
          });
     });

     return fetchedCommands;
}

module.exports = _module;
