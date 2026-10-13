const { REST, Routes } = require("discord.js");
const { Token, AppId, GuildId } = require("./data/secrets.json");

const path = require("node:path");
const fs = require("node:fs");
const LoggingLibrary = require("./libraries/logging-library");

const commands = [];

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath);

const rest = new REST().setToken(Token);

for (const file of commandFiles) {
     const filePath = path.join(commandsPath, file);
     const command = require(filePath);

     if ("data" in command && "execute" in command) {
          commands.push(command.data.toJSON());
     } else {
          LoggingLibrary.warn(`The command at ${file} is missing required properties.`);
     }
}

(async () => {
     try {
          await rest.put(Routes.applicationGuildCommands(AppId, GuildId), { body: commands });

          LoggingLibrary.info("Successfully reloaded all of the bot's slash commands.");
     } catch (error) {
          LoggingLibrary.error(error);
     }
});
