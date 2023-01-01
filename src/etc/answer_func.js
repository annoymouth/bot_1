const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const pollModel = require('../schemas/pollSchema');

module.exports = async (interaction, num) => {

    let poll_db = await pollModel.findOne({ _id: interaction.guildId });
    const { poll_data } = poll_db;

    if (poll_data['pollstatus'] === 'offline') {

        await interaction.reply({ content: 'この投票はもう終わってるよ', ephemeral: true })

    } else {

        if (poll_data['endDate'] < interaction.createdTimestamp) {
            await interaction.reply({ content: 'この投票はもう終わってるよ...\n「/poll result」を試してみて！', ephemeral: true })
        } else {
            if (interaction.message.id !== poll_data['messageid']) {

                await interaction.reply({ content: 'この投票はもう終わってるよ', ephemeral: true });

            } else if (interaction.message.id === poll_data['messageid']) {
                const userIndex = poll_data[`answer${num}_votes`].findIndex(elm => elm.username === interaction.user.username && elm.userid === interaction.user.id)
                switch (poll_data.pollType) {
                    case 'nomal':
                        if (userIndex === -1) {//answer{num}に存在しないとき
                            if (poll_data.members.includes(interaction.user.id)) {//memberに存在するとき
                                await interaction.reply({ content: 'もう投票したでしょ！', ephemeral: true });
                                break;
                            } else {
                                poll_data.members.push(interaction.user.id);
                            }
                        } else {//answer{num}に存在するとき
                            poll_data.members = poll_data.members.filter(elm => elm !== interaction.user.id)
                        }
                    case 'multiple':
                    default:
                        let replyText;

                        if (userIndex !== -1) {
                            poll_data[`answer${num}_votes`].splice(userIndex, 1);
                            replyText = poll_data[`answer${num}`] + 'への投票を取り消したよ!'
                        } else {
                            let voter = {
                                username: interaction.user.username,
                                userid: interaction.user.id
                            };
                            poll_data[`answer${num}_votes`].push(voter);
                            replyText = poll_data[`answer${num}`] + 'に投票したよ!'
                        };

                        poll_db = await pollModel.findOneAndUpdate(
                            { _id: interaction.guildId },
                            {
                                poll_data: poll_data
                            },
                            { new: true }
                        );
                        let buttons = [];
                        for (i = 1; i <= 5; i++) {
                            if (poll_data[`answer${i}`] != undefined) {
                                buttons.push(
                                    new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setCustomId(`answer${i}`)
                                                .setLabel(`${poll_data[`answer${i}`]} [${poll_data[`answer${i}_votes`].length}]`)
                                                .setStyle(ButtonStyle.Primary)
                                        )
                                )
                            }
                        }
                        const channel = interaction.channel;
                        channel.messages.cache.get(`${poll_data.messageid}`).edit({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`${poll_data[`title`]}`)
                                    .setAuthor({ name: `${poll_data['username']}`, iconURL: `${poll_data['usericon']}` })
                                    .setDescription(`投票終了時刻は: <t:${~~(poll_data.endDate / 1000)}:F>`)
                            ],
                            components: buttons,
                            fetchReply: true
                        })

                        await interaction.reply({ content: replyText, ephemeral: true });
                }


            }
        }

    }
}