const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('基本的な使い方'),
  async execute(interaction, client) {
    const description = 'このコマンドは投票を行えるコマンドだよ！\n\n\
          /poll start で投票を開始しよう！\n\
          投票のタイトルと2つの選択肢だけは必須だよ！入力しないとdiscordに怒られちゃうからね！\
          さらに追加で3つの選択肢と時間を設定できるよ！\
          時間は整数で1分から24時間（＝1440分)の間で決めてね！\
          単位は分で入力しよう！デフォルトは5分だよ！\n\n\
          /poll result で投票の結果を確認してね！私も気になるから！\n\
          このコマンドは投票終了時間を過ぎればみんな使えるけど、投票時間中に使えるのはその投票を作った人だけだから注意してね！自分が設定した時間が長すぎた時に中断するみたいな使い方ができるよ！\n\n\
          その他機能\n\
          オプションtypeでは投票の仕方を変更できるよ'

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('/pollについて')
          .setAuthor({ name: client.user.username})
          .setDescription(description)
      ],
      ephemeral: true
    });
  }
}