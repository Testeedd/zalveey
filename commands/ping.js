const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  let API = (bot.ping).toFixed(2)
  let diff = Date.now() - message.createdTimestamp

  let embed = new Discord.RichEmbed()
     .setDescription(`**__API:__** ${API}ms\n**__Latency__**: ${diff}ms`)
  message.channel.send(embed);
};

exports.config = {
  "name": "ping",
  "aliases": []
}