const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
  const { body } = await require("node-superfetch").get('https://api-to.get-a.life/meme');
  let emb = new Discord.RichEmbed()
  .setDescription(body.text)
  .setImage(body.url)
  message.channel.send(emb)
}

exports.config = {
  "name": "meme",
  "aliases": []
}