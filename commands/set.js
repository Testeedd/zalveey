exports.run = (bot, message, args) => {
  if (!message.member.hasPermissions("MANAGE_SERVER")) return message.channel.send("Sorry, you need Manage Server permission to run this command")
  let channel = message.mentions.channels.first()
  if (!args[1]) return
  else if (args[1] === "welcomechannel") {
    if (!channel) return message.channel.send("pls menion a channel")
    bot.servConf.set(`config.${message.guild.id}.welcomeChannel`, channel.id)
    message.channel.send(`Welcome message channel was set to **#${channel.name}.**`)
  } else if (args[1] === "leavechannel") {
    if (!channel) return message.channel.send("pls menion a channel")
    bot.servConf.set(`config.${message.guild.id}.leaveChannel`, channel.id)
    message.channel.send(`Leave message channel was set to **#${channel.name}.**`)
  }
  return
}

exports.config = {
  "name": "set",
  "aliases": []
}