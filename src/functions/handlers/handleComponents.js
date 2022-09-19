const fs = require('fs');

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolders = fs.readdirSync(`./src/components`);
        for (const folder of componentFolders) {
            const componentFiles = fs.readdirSync(`./src/components/${folder}`).filter(file => file.endsWith('.js'));
            
            const { buttons } = client;

            switch (folder) {
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(`../../components/${folder}/${file}`);
                        for (i = 0; i < button.length; i++) {
                            buttons.set(button[i].data.name, button[i]);
                        }
                    }
            }
        }
    }
}