const fs = require("node:fs");
const path = require("node:path");
const LoggingUtils = require("../../../utils/logging-utils");

const _module = {};

const guildsFolder = path.join(__dirname, "..", "..", "..", "data", "guilds");

_module.execute = async function(interaction) {
     const guild = interaction.guild;
     const filePath = path.join(guildsFolder, `${guild.id}.json`);

     if (fs.existsSync(filePath)) {
          const file = require(filePath);
          let concatMessage = "";

          for (const key in file) {
               concatMessage = `${concatMessage}[${key}]: ${file[key]}\n`;
          }

          concatMessage = "`%body%`".replace("%body%", concatMessage);
          interaction.reply(concatMessage);
     } else {
          LoggingUtils.error("This guild is missing its designated memory file.");
     }
}

module.exports = _module;
