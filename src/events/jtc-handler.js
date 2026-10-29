const { Events, ChannelType } = require("discord.js");
const LoggingUtils = require("../utils/logging-utils");

const _module = {
     name: Events.VoiceStateUpdate,
     isOnce: false
};

async function createPersonalChannel(guild, newState) {
     const categoryId = guild.memFetch("JTCCategoryId");
     const format = guild.memFetch("JTCFormat") ?? "%name%";
     const member = newState.member;

     const personalChannel = await guild.channels.create({
          name: format.replace("%name%", `${member.user.displayName}'s Channel`),
          type: ChannelType.GuildVoice,

          parent: categoryId
     });

     const personalIds = guild.memFetch("JTCPersonalChannelIds");
     personalIds[personalChannel.id] = member.user.id;
     guild.memSet("JTCPersonalChannelIds", personalIds);

     await member.voice.setChannel(personalChannel);
}

async function removeEmptyChannel(guild, oldState) {
     const personalChannel = await guild.channels.fetch(oldState.channelId);

     if (personalChannel.members.size == 0) {
          const personalIds = guild.memFetch("JTCPersonalChannelIds");
          delete personalIds[personalChannel.id];
          guild.memSet("JTCPersonalChannelIds", personalIds);

          await personalChannel.delete();
     }
}

_module.execute = async function(oldState, newState) {
     const guild = oldState.guild ?? newState.guild;
     const channelId = guild.memFetch("JTCChannelId");
     const personalIds = guild.memFetch("JTCPersonalChannelIds");

     if (!channelId) return;

     if (newState.channelId == channelId) {
          await createPersonalChannel(guild, newState);
          return;
     }

     if (personalIds[oldState.channelId]) {
          await removeEmptyChannel(guild, oldState);
     }
}

module.exports = _module;
