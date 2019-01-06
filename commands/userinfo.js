const Discord = require("discord.js");
const ColorMap = 
                {
                    'online' : '#00FF00',
                    'idle' : '#FF8000',
                    'streaming' : '#A901DB',
                    'dnd' : '#FF0000',
                    'offline' : '#848484'
                };
                const ngebot = 
                {
                    'true' : 'Bot',
                    'false' : 'Human'
                };
                const StatusMap = 
                {
                    'online' : `<:online:449590947165110283>`,
                    'idle' : `<:away:449590947110584321>`,
                    'streaming' : `<:streaming:504813930309222400>`,
                    'offline' : `<:offline:449590947047669760>`,
                    'dnd' : `<:dnd:449590946879766539>`

                };

                const StatusText = 
                {
                    'online' : 'Online',
                    'idle' : 'Idle',
                    'dnd' : 'Do Not Disturb',
                    'offline' : 'Offline',
                    'streaming' : 'Streaming'
                };

exports.run = (bot, message, args) => {
  let user = message.mentions.users.first() || message.author
  var member = message.guild.member(user)
  let embed = new Discord.RichEmbed()
      .setAuthor(`User info`, user.displayAvatarURL)
  .addField("General Info", `• Tag: ${user.tag}\n• ID: ${user.id}\n• Type: ${ngebot[user.bot]}`, true)
      .addField("Status", `• Presence: ${StatusMap[user.presence.status]} ${StatusText[user.presence.status]}\n• Game: ${user.presence.game ? user.presence.game.name : 'None'}`, true)
  .addField("Account Info", `• Created At: ${new Date(user.createdAt).toISOString().replace(/\T.+/, '')}`)
      .addField("Joined At", new Date(member.joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)      
      .addField("Nickname", `${member.nickname ? '' + member.nickname + '' : 'None'}`, true)
      .addField(`Roles List [${member.roles.size}]`, `${member.roles.map(roles => roles).join(' | ')}`, true)
      .setThumbnail(user.displayAvatarURL)
      //.setColor(ColorMap[user.presence.status])
  message.channel.send(embed);
};

exports.config = {
  "name": "userinfo",
  "aliases": ["ui", "user"]
}