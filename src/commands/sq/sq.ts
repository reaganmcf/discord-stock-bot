import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { getBest, getTicker, getWorst } from './data-fetch';

export const SQBestCommand: ICommand = {
  name: 'SQ-Best',
  helpDescription: '!sq-best gets the best looking tickers',
  showInHelp: false,
  trigger: (msg: Message) => msg.content.startsWith('!sq-best'),
  command: async (message: Message, services: any) => {
    const table = await getBest(services.cache);
    // eslint-disable-next-line no-nested-ternary
    table.sort((a, b) => ((a.MEAN < b.MEAN) ? 1 : ((b.MEAN < a.MEAN) ? -1 : 0)));
    const fields = table.map((value) => ({
      name: value.TICKER,
      value: `1 Week Forcasted Price: ${value.MEAN_SPOT} Forecasted Vol%: ${value.VOL_PCT * 100}`,
    }));
    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Best',
        fields,
      },
    });
    return Promise.resolve();
  },
};

export const SQWorstCommand: ICommand = {
  name: 'SQ-Worst',
  helpDescription: '!sq-worst gets the best looking tickers',
  showInHelp: false,
  trigger: (msg: Message) => msg.content.startsWith('!sq-worst'),
  command: async (message: Message, services: any) => {
    const table = await getWorst(services.cache);
    // eslint-disable-next-line no-nested-ternary
    table.sort((a, b) => ((a.MEAN < b.MEAN) ? 1 : ((b.MEAN < a.MEAN) ? -1 : 0)));
    const fields = table.map((value) => ({
      name: value.TICKER,
      value: `1 Week Forcasted Price: ${value.MEAN_SPOT} Forecasted Vol%: ${value.VOL_PCT * 100}`,
    }));
    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Worst',
        fields,
      },
    });
    return Promise.resolve();
  },
};

export const SQTickerCommand: ICommand = {
  name: 'SQ-Ticker',
  helpDescription: '!sq {ticker} for 1 ticker ',
  showInHelp: false,
  trigger: (msg: Message) => msg.content.startsWith('!sq '),
  command: async (message: Message, services: any) => {
    const ticker = message.content.replace('!sq', '').trim();
    try {
        const tickerInfo = await getTicker(ticker, services.cache);

        const fields = [
          {
            name: tickerInfo.TICKER,
            value: `1 Week Forcasted Price: ${tickerInfo.MEAN_SPOT} Forecasted Vol%: ${tickerInfo.VOL_PCT * 100}`,
          },
        ];

        message.channel.send({
          embed: {
            author: {
              name: message.client.user.username,
              icon_url: message.client.user.displayAvatarURL,
            },
            color: 3447003,
            title: tickerInfo.TICKER,
            fields,
          },
        });
    }
    catch (ex) {
      message.channel.send('You messed it up');
    }
    return Promise.resolve();
  },
};
