const fs = require('fs');
const path = require('node:path');
const { connect } = require('mongoose');
require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.initPollData();

client.login(process.env.token);
(async () => {
    await connect(process.env.databaseToken)
    .then(() => { console.log('connected to database')})
    .catch((error) => {console.log(error)});
})();