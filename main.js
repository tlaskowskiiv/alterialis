const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const cmds = require('./cmds.js');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.level = 'info';

const client = new Discord.Client();
const altIcon = 'https://raw.githubusercontent.com/tlaskowskiiv/alterialis/master/assets/alterialis.png'

const allPrefix = 'a!';
const adminPrefix = 'a@'

client.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: '+ client.user.username + '(' + client.user.id + ')');
});

client.on('message', message => {
    var altEmbed = new Discord.RichEmbed()
            .setColor('#D48187')
            .setAuthor('Alterialis', altIcon)
            .setFooter('Alterialis', altIcon)
            .setTimestamp();
            
    if (message.content.substring(0, 2) === allPrefix) {
        let args = message.content.substring(2).split(' ');
        let cmd = args[0];
        
        args = args.splice(1);
        
        switch(cmd) {
            case 'avatar':                                                      //a!avatar - Returns the avatar of either the sender or a user.//
                let member = message.mentions.users.first();
                if(args === '') {
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
    if (message.content.substring(0, 2) === adminPrefix) {
        let args = message.content.substring(2).split(' ');
        let cmd = args[0];
        
        args = args.splice(1);
        
        switch(cmd) {
            case 'kick': {                                                      //a@kick - Kicks a user.//
                let member = message.mentions.members.first();
                let user = message.mentions.users.first();
                if (message.member.hasPermission('KICK_MEMBERS')) {
                    if (member) {
                        if(member.kickable) {
                            let reason = args.slice(1).join(' ');
                            message.channel.send('**Kicked ' +  user.tag 
                                + ' for: ' + reason + '**');
                            message.delete();
                            member.kick(reason);
                        } else {
                            message.channel.send('**This user is not kickable.**')
                        }
                    } else {
                        message.channel.send('**You must mention a user to kick.**');
                    }
                } else {
                    message.channel.send('**You do not have permission to use a@kick.**')
                }
                break;
            }
            case 'ban': {                                                       //a@ban - Bans a user.//
                let member = message.mentions.members.first();
                let user = message.mentions.users.first();
                if (message.member.hasPermission('BAN_MEMBERS')) {
                    if (member) {
                        if(member.bannable) {
                            let reason = args.slice(1).join(' ');
                            message.channel.send('**Banned ' +  user.tag 
                                + ' for: ' + reason + '**');
                            message.delete();
                            member.ban(reason);
                        } else {
                            message.channel.send('**This user is not bannable.**')
                        }
                    } else {
                        message.channel.send('**You must mention a user to ban.**');
                    }
                } else {
                    message.channel.send('**You do not have permission to use a@ban.**')
                }
                break;
            }
        }
    }
});

client.login(auth.token);