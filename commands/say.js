exports.run = (bot, message, args) => {
  if (!args[1]) return
  else {
    message.delete()
    message.channel.send(args.slice(1).join(" "))
  }
  return
}

exports.config = {
  "name": "say",
  "aliases": []
}