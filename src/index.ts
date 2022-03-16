import Discord from 'discord.js';
import { connect } from 'mongoose';
import NodeCache from 'node-cache';
import express from 'express';
import got from 'got';
import { commandList } from './commandlist';

require('dotenv').config();

const app = express();

// use the express-static middleware
app.use(express.static('public'));

app.get('/latest', (req, res) => {
  got(`${process.env.SQ_URI}/latest?key=${process.env.SQ_KEY}`).json().then((value) => {
    res.json(value);
  });
});

app.get('/symbol/:ticker', (req, res) => {
  got(`${process.env.SQ_URI}/symbol/${req.params.ticker}?key=${process.env.SQ_KEY}`).json().then((value) => {
    res.json(value);
  });
});

app.get('/screen/:which', (req, res) => {
  got(`${process.env.SQ_URI}/symbol/${req.params.which}?key=${process.env.SQ_KEY}`).json().then((value) => {
    res.json(value);
  });
});

// start the server listening for requests
app.listen(process.env.PORT || 3000,
  () => console.log('Server is running...'));

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
