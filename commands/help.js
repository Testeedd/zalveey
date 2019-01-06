const Discord = require("discord.js")

exports.run = (bot, message, args) => {
  if (!args[1]) {
    let embed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Command List`, bot.user.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setDescription("Prefix: `z;`")
    .addField("General:", "`help,` `ping,` `stats`")
    .addField("Utility:", "`serverinfo,` `userinfo [@user],` `avatar [@user],`")
    .addField("Fun:", "`say,` `meme,` `ascii`")
    message.channel.send(embed)
  }
  return
}

exports.config = {
  "name": "help",
  "aliases": ["h","commands","command","cmd","cmds"]
}