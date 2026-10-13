const { Client, Events, GatewayIntentBits, ActivityType, Collection } = require("discord.js");
const { Token } = require("./data/secrets.json");

const LoggingLibrary = require("./libraries/logging-library");
const CommandUtils = require("./utilities/command-utils");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const fetchedCommands = CommandUtils.fetchCommands();

for (let i = 0; i <= fetchedCommands.length(); i++) {
     const command = fetchedCommands[i];

     client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (readyClient) => {
     readyClient.user.setPresence({
          activities: [{ name: "created by @wxdbeenblxssed", type: ActivityType.Custom }],
          status: "dnd"
     });

     LoggingLibrary.info("Successfully logged into the bot's account. The bot is now ready for operation.");
});

client.on(Events.InteractionCreate, async (interaction) => {
     if (!interaction.isChatInputCommand()) return;

     const command = interaction.client.commands.get(interaction.commandName);

     try {
          await command.execute(interaction);
     } catch (error) {
          LoggingLibrary.error(error);
     }
});

client.login(Token);
