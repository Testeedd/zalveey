const Discord = require("discord.js")

exports.run = (bot, message, args) => {
  if (!message.member.hasPermissions("MANAGE_SERVER")) return message.channel.send("Sorry, you need Manage Server permission to run this command")
  if (!args[1]) {
    return message.channel.send("please enter a new bot prefix")// sucessfully set bot prefix to z;
  } else if (args[1] === "reset") {
    bot.servConf.delete(`config.${message.guild.id}.prefix`);
    message.channel.send("successfully reset bot prefix");
  } else if (args[1] === "set") {
    bot.servConf.set(`config.${message.guild.id}.prefix`, args[2]);
    message.channel.send(`sucessfully set bot prefix to ${args[2]}`)
  }
};

exports.config = {
  "name": "prefix",
  "aliases": ["pr"]
}