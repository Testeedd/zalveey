const Discord = require('discord.js');
const ZalveeyClient = require("./zalveey.js")
const fs = require("fs")
const { Canvas } = require("canvas-constructor")
const { loadImage } = require("canvas")
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL);
const db = require("quick.db")
const bot = new ZalveeyClient({
  disableEveryone: true,
})
const PREFIX = "z;"
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
bot.servConf = new db.table("serverConfig")
require("./uptime.js")

bot.on("ready", () => {
    console.log("Bot Online");
  
     setInterval(() => {
        dbl.postStats(bot.guilds.size, bot.shards.id, bot.shards.total);
     }, 1800000);
     setInterval(() => {
      let statuses = ["z;help for command list!",` With ${bot.users.size} users!`, `Pukul ${require("moment")().utcOffset('+0700').format('HH:mm')} WIB`];
      let ranstatus = Math.floor(Math.random() * statuses.length);
         bot.user.setActivity(statuses[ranstatus], { type: "STREAMING", url: "https://www.twitch.tv/untitleeed" })
     }, 5000);
    bot.user.setStatus("online")
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err)
  
  let jsfile = files.filter(cmd => cmd.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    return console.log("couldn't find command")
  }
  jsfile.forEach((f, i) => {
    let cmd = require(`./commands/${f}`)
    //console.log(`${f} loaded`);
    bot.commands.set(cmd.config.name, cmd)
    cmd.config.aliases.forEach(alias => {
      bot.aliases.set(alias, cmd.config.name)
    })
  })
})

bot.on("message", async message => {
  if (message.author.bot) return
  if (!message.guild) return
  let PREFIX = bot.servConf.get(`config.${message.guild.id}.prefix`);
  if (!PREFIX) PREFIX = 'z;';
  if (!message.content.startsWith(PREFIX)) return
  let args = message.content.split(" ");
  let command = message.content.toLowerCase().split(" ")[0];
	command = command.slice(PREFIX.length);
  
  try {
    let commandFile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
    if (commandFile) commandFile.run(bot, message, args)
  } catch (e) {
    return console.log(e.stack)
  } finally {
    console.log(`${message.author.tag} used ${command} command on ${message.guild.name}.`)
  }
})

bot.on("guildMemberAdd", async member => {
  let memberpp = await loadImage(member.user.displayAvatarURL)
  let welcomech = member.guild.channels.get(bot.servConf.get(`config.${member.guild.id}.welcomeChannel`))
  if (!welcomech) return
  let welcomecv = new Canvas(800, 350)
    .setColor("#f9f9f9")
    .addRect(0,0,800,350)
    .setShadowColor("#212121")
    .setShadowBlur(100)
    .setColor("#efefef")
    .addRect(10,10,780,340)
    .setColor("#3d3d3d")
    .addCircle(400, 120, 110)
    .addCircularImage(memberpp, 400, 120, 100)
    .setTextAlign("center")
    .setTextFont('27px Impact')
    .addText(`Welcome To ${member.guild.name}, ${member.user.username}!`, 400, 265)
    .addText(`You're the ${member.guild.memberCount} Members`, 400, 300)
  let attachment = new Discord.Attachment(welcomecv.toBuffer(), 'welcome-image.png')
  welcomech.send(attachment)
})

bot.on("guildMemberRemove", async member => {
  let memberpp = await loadImage(member.user.displayAvatarURL)
  let leavech = member.guild.channels.get(bot.servConf.get(`config.${member.guild.id}.leaveChannel`))
  if (!leavech) return
  let leavecv = new Canvas(800, 350)
    .setColor("#f9f9f9")
    .addRect(0,0,800,350)
    .setShadowColor("#212121")
    .setShadowBlur(100)
    .setColor("#efefef")
    .addRect(10,10,780,340)
    .setColor("#3d3d3d")
    .addCircle(400, 120, 110)
    .addCircularImage(memberpp, 400, 120, 100)
    .setTextAlign("center")
    .setTextFont('27px Impact')
    .addText(`GoodBye ${member.user.username},`, 400, 265)
    .addText(`Have Fun Out Of There.`, 400, 297)
    .addText(`Current Total Members Are ${member.guild.memberCount} Members`, 400, 330)
  let attachment = new Discord.Attachment(leavecv.toBuffer(), 'leave-image.png')
  leavech.send(attachment)
})

bot.login(process.env.TOKEN)
