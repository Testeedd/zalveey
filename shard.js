// TUTORIAL SHARDING (discord.js)
const { ShardingManager } = require('discord.js');
const TOKEN = process.env.TOKEN; 
const mainFile = "./index.js"; //GANTI INI!

const shards = new ShardingManager(`${mainFile}`, {
    token: TOKEN,
    totalShards: "auto", //1 SAJA DULU ;v
    respawn: true,
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id} [${shard.id + 1}/${shards.totalShards}]`);
});

shards.on('message', (shard, message) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${message._eval} | ${message._result}`);
});

shards.spawn();