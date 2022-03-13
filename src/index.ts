import Discord from 'discord.js';
import { connect } from 'mongoose';
import NodeCache from 'node-cache';

import { commandList } from './commandlist';

require('dotenv').config();

const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});

const cache = new NodeCache();

client.on('message', (msg) => {
  const commands = commandList.filter((command) => command.trigger(msg));
  Promise.all(commands.map(async (command) => {
    command.command(msg, { cache });
  })).then();
});

client.login(process.env.TOKEN);

const databaseAcess = `mongodb+srv://${
  process.env.DB_USER
}:${
  process.env.DB_PASS
}@${
  process.env.DB_CLUSER
}.mongodb.net/${
  process.env.DB_NAME
}?retryWrites=true&w=majority`;

connect(databaseAcess, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('connected to db'))
  .catch((reason) => console.error('failed to connect to db', reason));
