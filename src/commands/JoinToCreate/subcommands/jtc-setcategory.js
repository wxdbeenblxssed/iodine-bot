const { ChannelType } = require("discord.js");

const _module = {};

_module.execute = async function(interaction) {
     const category = interaction.options.getChannel("category");
     const guild = interaction.guild;

     const jtcVoiceChannel = await guild.channels.create({
          name: "Join To Create",
          type: ChannelType.GuildVoice,

          parent: category.id
     });

     guild.memSet("JTCCategoryId", category.id);
     guild.memSet("JTCChannelId", jtcVoiceChannel.id);
     guild.memSet("JTCPersonalChannelIds", {});
}

module.exports = _module;
