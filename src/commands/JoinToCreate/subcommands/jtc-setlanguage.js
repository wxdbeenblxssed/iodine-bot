const JTCUtils = require("../../../utils/jtc-utils");
const FontUtils = require("../../../utils/font-utils");

const _module = {};

_module.execute = async function(interaction) {
     const language = interaction.options.getString("language");
     const guild = interaction.guild;
     const format = guild.memFetch("JTCFormat"); 

     await JTCUtils.handleChannelLogic(interaction, guild, async (voiceChannel) => {
          const newName = FontUtils.setFont("fds", format.replace("%name%", `${language} - Personal Channel`).toLowerCase());

          await voiceChannel.setName(newName);
     });
}

module.exports = _module;
