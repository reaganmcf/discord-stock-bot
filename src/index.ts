import Discord from 'discord.js';

import { commandList } from './commandlist';

require('dotenv').config();

const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (msg) => {
  const commands = commandList.filter((command) => command.trigger(msg));
  Promise.all(commands.map(async (command) => {
    command.command(msg);
  })).then();
});

client.login(process.env.TOKEN);
