const _module = {};

_module.execute = async function(interaction) {
     const channel = interaction.options.getChannel("channel");
     const guild = interaction.guild;

     guild.memSet("JALChannelId", channel.id);
}

module.exports = _module;
