const JTCUtils = require("../../../utils/jtc-utils");

const _module = {};

_module.execute = async function(interaction) {
     const limit = interaction.options.getInteger("limit");
     const guild = interaction.guild;

     await JTCUtils.handleChannelLogic(interaction, guild, async (voiceChannel) => {
          await voiceChannel.setUserLimit(limit);
     });
}

module.exports = _module;
