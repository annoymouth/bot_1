const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('22/09/19 更新'),
  async execute(interaction, client) {
    const description = '22/09/19\n\
    updateコマンド実装\n\
    mongoDB導入'

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('アップデート履歴')
          .setDescription(description)
      ],
      ephemeral: true
    });
  }
}