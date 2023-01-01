const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const pollModel = require('../../schemas/pollSchema');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('投票に関するコマンドだよ！')
    .addSubcommand(subcommand =>
      subcommand
        .setName('start')
        .setDescription('投票を作成するよ！')
        .addStringOption(option => option.setName('title').setDescription('投票のタイトルを入力してね！').setRequired(true))
        .addStringOption(option => option.setName('answer1').setDescription('1つ目の回答をここに入力！').setRequired(true))
        .addStringOption(option => option.setName('answer2').setDescription('2つ目はここに入力！').setRequired(true))
        .addStringOption(option => option.setName('answer3').setDescription('3つ目はここだよ～！'))
        .addStringOption(option => option.setName('answer4').setDescription('俺の出番ってわけか'))
        .addStringOption(option => option.setName('answer5').setDescription('僕を使ってくれるんですか！？'))
        .addIntegerOption(option => option.setName('time').setDescription('投票時間を入力してね！単位は分だよ！'))
        .addStringOption(option => option.setName('type')
        .setDescription('投票のタイプを選択してね！')
        .addChoices(
          {name: 'nomal', value: 'nomal'},
          {name: 'multiple', value: 'multiple'}
        )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('result')
        .setDescription('投票結果を確認できます！'))
  ,
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'start') {

      let poll_db = await pollModel.findOne({ _id: interaction.guildId });
      if (poll_db === null) {
        let int_poll = {
          endDate: 0,
          pollstatus: 'offline'
        }
        poll_db = await pollModel.create(
          {
            _id: interaction.guildId,
            poll_data: int_poll
          }
        );
      }
      const { poll_data } = poll_db;

      if (poll_data.endDate > interaction.createdTimestamp) {

        await interaction.reply({ content: 'ごめんね、まだ前回の投票が終わってないみたい...', ephemeral: true });

      } else if (poll_data.endDate < interaction.createdTimestamp) {

        if (poll_data.pollstatus === 'online') {
          poll_data.pollstatus = 'offline';
        }

        if (poll_data.pollstatus === 'offline') {

          let time = interaction.options.getInteger('time') ?? 5;
          time = time < 1 ? 1 : time > 60 * 24 ? 60 * 24 : time;

          let poll = {
            title: interaction.options.getString('title'),
            answer1: interaction.options.getString('answer1'),
            answer2: interaction.options.getString('answer2'),
            answer3: interaction.options.getString('answer3') ?? undefined,
            answer4: interaction.options.getString('answer4') ?? undefined,
            answer5: interaction.options.getString('answer5') ?? undefined,
            answer1_votes: [],
            answer2_votes: [],
            answer3_votes: [],
            answer4_votes: [],
            answer5_votes: [],
            pollType: interaction.options.getString('type') ?? 'nomal',
            startDate: interaction.createdTimestamp,
            endDate: (interaction.createdTimestamp + 1000 * 60 * time),
            members: [],
            username: interaction.user.username,
            usericon: interaction.user.displayAvatarURL(),
            userid: interaction.user.id,
            pollstatus: 'online'
          }


          let buttons = [];
          for (i = 1; i <= 5; i++) {
            if (poll[`answer${i}`] != undefined) {
              buttons.push(
                new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId(`answer${i}`)
                      .setLabel(`${poll[`answer${i}`]}`)
                      .setStyle(ButtonStyle.Primary)
                  )
              )
            }
          }

          const message = await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(`${poll[`title`]}`)
                .setAuthor({ name: `${poll['username']}`, iconURL: `${poll['usericon']}` })
                .setDescription(`投票終了時刻は: <t:${~~(poll.endDate / 1000)}:F>です。`)
            ],
            components: buttons,
            fetchReply: true
          });

          poll.messageid = message.id;


          poll_db = await pollModel.findOneAndUpdate(
            { _id: interaction.guildId },
            { poll_data: poll },
            { new: true }
          );
          /*
          //デバッグ用です。きっと役に立ちます。
          console.log(poll_db.poll_data); //現在
          console.log(poll_data); //過去
          */

        };
      }


    } else if (interaction.options.getSubcommand() === 'result') {

      let poll_db = await pollModel.findOne({ _id: interaction.guildId });
      const { poll_data } = poll_db;

      if (poll_data['endDate'] > interaction.createdTimestamp) {

        if (interaction.user.id !== poll_data['userid']) {

          await interaction.reply({ content: '今このコマンドを使えるのは投票を始めた人だけなんだ...', ephemeral: true });

        }

      }

      if (poll_data['pollstatus'] === 'offline') {

        await interaction.reply({ content: '投票はまだ行われてないよ！', ephemeral: true });

      } else if (poll_data['pollstatus'] === 'online') {

        poll_db = await pollModel.findOneAndUpdate(
          { _id: interaction.guildId },
          {
            'poll_data.pollstatus': 'offline',
            'poll_data.endDate': interaction.createdTimestamp
          },
          { new: true }
        );

        let result = '';
        for (i = 1; i <= 5; i++) {
          if (poll_data[`answer${i}`] != undefined) {
            result += `${poll_data[`answer${i}`]}: ${poll_data[`answer${i}_votes`].length}\n`
          }
        }

        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`${poll_data[`title`]}`)
              .setAuthor({ name: `${poll_data['username']}`, iconURL: `${poll_data['usericon']}` })
              .setDescription(result)
          ]
        });
      }

    }
  }
}