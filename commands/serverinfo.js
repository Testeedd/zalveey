const Discord = require("discord.js");
const StatusMap = 
                {
                    'brazil' : `:flag_br: Brazil`,
                    'eu-central' : `:flag_eu: Central Europe`,
                    'hongkong' : `:flag_hk: Hong Kong`,
                    'japan' : `:flag_jp: Japan`,
                    'russia' : `:flag_ru: Russia`,
                    'singapore' : `:flag_sg: Singapore`,
                    'southafrica' : `:flag_za: South Africa`,
                    'sydney' : `:flag_au: Sydney`,
                    'us-central' : `:flag_us: US Central`,
                    'us-east' : `:flag_us: US East`,
                    'us-south' : `:flag_us: US South`,
                    'eu-west' : `:flag_eu: Wester Europe`,
                    'us-west' : `:flag_us: US West`

                };
const verif = {
  "0": "None",
  "1": "Low",
  "2": "Medium",
  "3": "High",
  "4": "Very High"
}

exports.run = (bot, message, args) => {
  let online = message.member.guild.members.filter(o => o.presence.status === 'online').size
  let idle = message.member.guild.members.filter(o => o.presence.status === 'idle').size
  let dnd = message.member.guild.members.filter(o => o.presence.status === 'dnd').size
  let off = message.member.guild.members.filter(o => o.presence.status === 'offline').size
  try {
    if (!args[1]) {
  var embed = new Discord.RichEmbed()
      .setAuthor("Server Info", message.guild.iconURL)
      .addField("Server Name", message.guild.name, true)
      .addField("Server Owner", `<@${message.guild.ownerID}>`, true)
      .addField(`Member Total [${message.guild.memberCount}]`, `**${message.guild.members.filter(m => !m.user.bot).size}** Humans\n**${message.guild.members.filter(m => m.user.bot).size}** Bots`, true)
      .addField("Status", `<:online:449590947165110283> ${online} <:away:449590947110584321> ${idle}\n<:dnd:449590946879766539> ${dnd} <:offline:449590947047669760> ${off}`, true)
      .addField(`Channels [${message.guild.channels.size}]`, `**${message.guild.channels.filter(a => a.type === "category").size}** Categories\n**${message.guild.channels.filter(channel => channel.type === 'voice').size}** Voice Channels\n**${message.guild.channels.filter(channel => channel.type === 'text').size}** Text Channels`, true)
      .addField("Server Region", StatusMap[message.guild.region], true)
      .addField("Server ID", message.guild.id, true)
      .addField("Verification Level", verif[message.guild.verificationLevel], true)
      .addField("Created On", message.guild.createdAt, true)
      .setThumbnail(message.guild.iconURL)
      .setColor("#4286f4")
  message.channel.send(embed);
  } else if (args[1] === "emojis") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} Emote List`, message.guild.iconURL)
    .setDescription(message.guild.emojis.map(a => a).join(" • "))
    .setFooter(`Total: ${message.guild.emojis.size}`)
    message.channel.send(embed)
  } else if (args[1] === "roles") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} Role List`, message.guild.iconURL)
    .setDescription(message.guild.roles.map(b => b).join(' | '))
    .setFooter(`Total: ${message.guild.roles.size}`)
    message.channel.send(embed)
  }
  } catch (e) {
    console.log(e)
  }
  return
};

exports.config = {
  "name": "serverinfo",
  "aliases": ["si", "server"]
}