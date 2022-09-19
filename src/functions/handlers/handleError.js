module.exports = (client) => {
    const adminID = '830078741329608714';

    process.on('unhandledRejection', error => {

        const user = client.users.fetch(adminID);

        console.error('Unhandled rejection:', error);

        user.send('An Error has been occured in the bot console!**\n\nERROR\n\n**```' + error + '```')

    });

    process.on('uncaughtExeption', error => {

        const user = client.users.fetch(adminID);

        console.error('Uncaught exeption:', error);

        user.send('An Error has been occured in the bot console!**\n\nERROR\n\n**```' + error + '```')

    });
}