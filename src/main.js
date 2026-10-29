const { Client, Events, GatewayIntentBits, ActivityType } = require("discord.js");
const { Token } = require("./data/secrets.json");
const jsonfile = require("jsonfile");
const fs = require("node:fs");
const path = require("node:path");
const LoggingUtils = require("./utils/logging-utils");

const botStatus = "hello there peoples, i'm Iodine"
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

function addMissingGuildFiles() {
     const guildsFolder = path.join(__dirname, "data", "guilds");

     client.guilds.cache.forEach(guild => {
          const guildFile = path.join(guildsFolder, `${guild.id}.json`);

          if (!fs.existsSync(guildFile)) jsonfile.writeFile(guildFile, {});
     });
}

function initClassExtensions() {
     const classesFolder = path.join(__dirname, "classes");

     fs.readdirSync(classesFolder).forEach(file => {
          const filePath = path.join(classesFolder, file);
          require(filePath);
     });
}

function parseEventHandlers() {
     const eventsFolder = path.join(__dirname, "events");

     fs.readdirSync(eventsFolder).forEach(file => {
          const filePath = path.join(eventsFolder, file);
          const module = require(filePath);

          if (module.isOnce) {
               client.once(module.name, module.execute);
          } else {
               client.on(module.name, module.execute);
          }

          if (module.init) module.init(client);
     });
}

client.once(Events.ClientReady, (readyClient) => {
     readyClient.user.setPresence({
          activities: [{ name: botStatus, type: ActivityType.Custom }],
          status: "dnd"
     });

     try {
          initClassExtensions();
          addMissingGuildFiles();
          parseEventHandlers();
     } catch(error) {
          LoggingUtils.error("The bot failed to start due to one or more startup processes failing.");
          LoggingUtils.error(error);

          process.exit(0);
     }

     LoggingUtils.info("Successfully logged into the bot's account and performed all startup processes.");
});

client.login(Token);
