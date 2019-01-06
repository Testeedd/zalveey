const figlet = require("figlet");

exports.run = (bot, message, args) => {
  if (!args.slice(1).join(" ")) return
  figlet(args.slice(1).join(" "), (err, data) => {
    message.channel.send(data, {
      code: "ascii"
    });
  });
};

exports.config = {
  "name":"ascii",
  "aliases": []
}