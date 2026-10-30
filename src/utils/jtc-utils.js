const LoggingUtils = require("./logging-utils");

const _module = {};

_module.handleChannelLogic = async function(interaction, guild, callback) {
     const member = interaction.member;
     const voiceChannel = member.voice.channel;
     const personalIds = guild.memFetch("JTCPersonalChannelIds");

     if (!voiceChannel) {
          LoggingUtils.error("Can't set the channel config as the member isn't connected to one.");
          return;
     }
     if (!personalIds[voiceChannel.id]) return;

     if (personalIds[voiceChannel.id] == member.user.id) {
          await callback(voiceChannel);
     } else {
          LoggingUtils.warn("Couldn't change the channel config as the member doesn't own it.");
     }
}

module.exports = _module;
