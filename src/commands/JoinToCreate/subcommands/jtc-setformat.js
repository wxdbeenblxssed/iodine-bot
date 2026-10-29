const _module = {};

_module.execute = async function(interaction) {
     const schema = interaction.options.getString("schema");
     const guild = interaction.guild;

     guild.memSet("JTCFormat", schema);
}

module.exports = _module;
