import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { extractFromOptions, checkTicker } from '../../common';
import { drawMoon } from './moon';
import { TickerTracker } from '../../services/tickerTracker';

const tickerAlias = new Map([
  ['tim', 'aapl'],
  ['lisa', 'amd'],
  ['mouse', 'dis'],
  ['jeff', 'amzn'],
  ['milk', 'rkt'],
  ['nutella', 'msft'],
]);

const goonTickers = ['ndra', 'aht', 'mrna'];
const memeTickers = ['clov', 'sofi', 'pltr', 'gme', 'amc', 'rkt', 'bb', 'bbw', 'wish'];

const getTicker = (name: string): string => {
  const normalizedName = name.toLowerCase();
  if (normalizedName === 'goon') {
    return goonTickers[Math.floor(Math.random() * goonTickers.length)];
  } if (normalizedName === 'meme') {
    return memeTickers[Math.floor(Math.random() * memeTickers.length)];
  }

  const ticker = tickerAlias.get(normalizedName);
  if (ticker) {
    return ticker;
  }
  return name;
};

export const StocksCommand: ICommand = {
  name: 'Stocks',
  helpDescription: 'example $aapl draw aapl chart',
  showInHelp: true,
  trigger: (msg: Message) => {
    const regex = new RegExp(/^\$[a-zA-Z]+/);
    return regex.test(msg.content);
  },
  command: async (message: Message) => {
    let ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].split(' ');
    const options = [];
    for (let i = 1; i < rawOptions.length; i++) options.push(rawOptions[i]);
    let timePeriod = extractFromOptions('time_period', options);
    const chartType = extractFromOptions('chart_type', options);
    const additionalIndicators = extractFromOptions('indicators', options);
    if (additionalIndicators.length !== 0) timePeriod = 'd';

    ticker = getTicker(ticker);

    const imgFile = `https://elite.finviz.com/chart.ashx?t=${
      ticker
    }&ty=${
      chartType
    }${timePeriod === 'd' ? `&ta=st_c,sch_200p${additionalIndicators}` : ''
    }&p=${
      timePeriod
    }&s=l`
        + `x=${Math.random()}.png`;

    TickerTracker.postTicker(ticker, message.author.id, 'stock');

    if (checkTicker(ticker)) {
      if (rawOptions.find((v) => v === 'moon')) {
        await drawMoon(imgFile, message);
      } else {
        message.channel
          .send(
            {
              files: [imgFile],
            },
          );
      }
    }
  },
};

export const StocksC2: ICommand = {
  name: 'Stock day chart',
  helpDescription: '!c2',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!c2'),
  command: async (message: Message) => {
    let ticker = message.content.toLowerCase().split(' ')[1];
    if (checkTicker(ticker)) {
      ticker = getTicker(ticker);

      TickerTracker.postTicker(ticker, message.author.id, 'stock');

      message.channel
        .send(
          {
            files: [
              `https://elite.finviz.com/chart.ashx?t=${
                ticker
              }&ty=c
              }&p=i5&s=l`
              + `x=${Math.random()}.png`,
            ],
          },
        );
    }
  },
};

export const StocksC4: ICommand = {
  name: 'Stock ta chart',
  helpDescription: '!c4',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!c4'),
  command: async (message: Message) => {
    let ticker = message.content.toLowerCase().split(' ')[1];
    if (checkTicker(ticker)) {
      ticker = getTicker(ticker);

      TickerTracker.postTicker(ticker, message.author.id, 'stock');

      message.channel
        .send(
          {
            files: [
              `https://elite.finviz.com/chart.ashx?t=${
                ticker
              }&ty=c
              &p=d&ta=st_c,sch_200p,rsi_b_14,sma_50,sma_200,sma_20`
              + `x=${Math.random()}.png`,
            ],
          },
        );
    }
  },
};
