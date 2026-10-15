const { REST, Routes } = require("discord.js");
const { Token, AppId, GuildId } = require("./data/secrets.json");

const LoggingLib = require("./libraries/logging-lib");
const CommandUtils = require("./utilities/command-utils");

const commands = [];
const fetchedCommands = CommandUtils.fetchCommands();

const rest = new REST().setToken(Token);

for (let i = 0; i < fetchedCommands.length; i++) {
     const command = fetchedCommands[i];

     commands.push(command.data.toJSON());
}

(async () => {
     try {
          await rest.put(Routes.applicationGuildCommands(AppId, GuildId), { body: commands });

          LoggingLib.info("Successfully reloaded all of the bot's slash commands.");
     } catch (error) {
          LoggingLib.error(error);
     }
})();
