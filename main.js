const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const cmds = require('./cmds.js');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.level = 'info';

const client = new Discord.Client();
const altIcon = 'https://raw.githubusercontent.com/tlaskowskiiv/alterialis/master/assets/alterialis.png'

const prefix = 'a!';

client.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: '+ client.user.username + '(' + client.user.id + ')');
});

client.on('message', message => {
    if (message.content.substring(0, 2) === prefix) {
        let args = message.content.substring(2).split(' ');
        let cmd = args[0];
        
        args = args.splice(1);
        
        var altEmbed = new Discord.RichEmbed()
            .setColor('#D48187')
            .setAuthor('Alterialis', altIcon)
            .setFooter('Alterialis', altIcon)
            .setTimestamp();
            
        switch(cmd) {
            case 'avatar':                                                      //a!avatar - Returns the avatar of either the sender or a user.//
                let member = message.mentions.users.first();
                if(args == '') {
                    message.channel.send(message.author.avatarURL);
                }
                else if(member instanceof Discord.User) {
                    message.channel.send(member.avatarURL);
                }
                break;
            case 'help':                                                        //a!help - Returns an embed of all commands.//
                let commands = cmds.run();
                commands.forEach(function(command){
                    altEmbed.addField(command[0], command[1]);
                });
                altEmbed.setAuthor('Commands', altIcon);
                message.channel.send(altEmbed);
                break;
            case 'ping':                                                        //a!ping - Responds with "Pong!"//
                message.channel.send('Pong!');
                break;
        }
    }
});

client.login(auth.token);