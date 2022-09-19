
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'ごめんね、エラーが出ちゃったみたい...', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);

            try {
                await button.execute(interaction);
            } catch (error) {
            console.error(error);
                await interaction.reply({ content: 'ごめんね、エラーが出ちゃったみたい...', ephemeral: true });
            }
        }
    },
}