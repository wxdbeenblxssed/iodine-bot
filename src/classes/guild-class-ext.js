const { Guild } = require("discord.js");
const path = require("node:path");
const jsonfile = require("jsonfile");
const fs = require("node:fs");
const LoggingUtils = require("../utils/logging-utils");

Guild.prototype.memory = {};

function getMemoryFile(guildId) {
     const memoryPath = path.join(__dirname, "..", "data", "guilds", `${guildId}.json`);

     if (fs.existsSync(memoryPath)) {
          return { memoryFile: require(memoryPath), memoryPath: memoryPath };
     } else {
          LoggingUtils.error(`Coudln't find memory file for guild ID: ${guildId}`);
     }
}

Guild.prototype.addInfraction = function(userId, type, reason) {
     const infraction = {
          userId: userId,

          type: type,
          reason: reason
     };

     const infractions = this.memFetch("Infractions");
     infractions.push(infraction);
     this.memSet("Infraction", infractions);
}

Guild.prototype.memSet = function(key, value) {
     const { memoryFile, memoryPath } = getMemoryFile(this.id);
     memoryFile[key] = value;

     jsonfile.writeFile(memoryPath, memoryFile, { flags: "o" });
}

Guild.prototype.memFetch = function(key) {
     const { memoryFile } = getMemoryFile(this.id);
     
     return memoryFile[key];
}
