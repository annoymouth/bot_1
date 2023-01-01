const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('22/09/19 更新'),
  async execute(interaction, client) {
    const description = '22/09/19\n\
    updateコマンド実装\n\
    mongoDB導入\n\n\
    22/11/06\n\
    guild初回の投票が作成できない問題を修正\n\n\
    23/01/01\n\
    投票時間終了後にresultを挟まずに投票を開始できるようになりました\n\
    複数投票を作成できる機能を追加しました\n\
    票を取り消す機能を追加しました'

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