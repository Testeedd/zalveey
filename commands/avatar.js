const Discord = require("discord.js")

exports.run = (bot, message, args) => {
  let user = message.mentions.users.first() || message.author
  let embed = new Discord.RichEmbed()
  .setAuthor(`${user.tag} Avatar`)
  .setTitle("Direct Link")
  .setURL(user.displayAvatarURL)
  .setImage(user.displayAvatarURL)
  message.channel.send(embed)
  return
}

exports.config = {
  "name": "avatar",
  "aliases": ["ava","useravatar","a"]
}