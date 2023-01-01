const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('このbotに関する情報だよ'),
  async execute(interaction, client) {
    const description = 'このbotは投票を行えるbotだよ！\
          でもまだまだ調整中なんだ...\
          もし開発に興味があったらASAPにDMして！'

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('こんにちは！')
          .setAuthor({ name: client.user.username})
          .setDescription(description)
      ],
      ephemeral: true
    });
  }
}