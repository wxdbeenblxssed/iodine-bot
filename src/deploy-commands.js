const { REST, Routes } = require("discord.js");
const { Token, AppId, MainGuildId } = require("./data/secrets.json");
const CommandUtils = require("./utils/command-utils");
const LoggingUtils = require("./utils/logging-utils");

const commands = [];
const fetchedCommands = CommandUtils.fetchCommands();
const rest = new REST().setToken(Token);

fetchedCommands.forEach(command => {
     commands.push(command.data.toJSON());
});

(async () => {
     try {
          const data = await rest.put(Routes.applicationGuildCommands(AppId, MainGuildId), { body: commands });

          LoggingUtils.info(`Successfully reloaded all ${data.length} available slash commands.`);
     } catch(error) {
          LoggingUtils.error(error);
     }
})();
