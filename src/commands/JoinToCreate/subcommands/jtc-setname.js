const LoggingUtils = require("../../../utils/logging-utils");
const FontUtils = require("../../../utils/font-utils");

const _module = {};

_module.execute = async function(interaction) {
     const name = interaction.options.getString("name");
     const guild = interaction.guild;

     const voiceChannel = interaction.member.voice.channel;
     const personalIds = guild.memFetch("JTCPersonalChannelIds");
     const format = guild.memFetch("JTCFormat"); 

     if (!voiceChannel) {
          LoggingUtils.error("Can't set the channel name as the member isn't connected to one.");
          return;
     }
     if (!personalIds[voiceChannel.id]) return;

     if (personalIds[voiceChannel.id] == interaction.member.user.id) {
          const newName = FontUtils.setFont("fds", format.replace("%name%", name));

          await voiceChannel.setName(newName);
     } else {
          LoggingUtils.warn("Couldn't change the channel name as the member doesn't own it.");
     }
}

module.exports = _module;
