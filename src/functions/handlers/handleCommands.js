const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync(`./src/commands`);
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.token);

        rest.put(Routes.applicationCommands(process.env.clientId), { body: client.commandArray })
            .then(data => console.log(`Successfully registered ${data.length} application commands`))
            .catch(console.error);
    }
}