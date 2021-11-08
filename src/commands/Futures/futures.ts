import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { extractFromOptions } from '../../common';
import { TickerTracker } from '../../services/tickerTracker';

export const FuturesCommand: ICommand = {
  name: 'Futures',
  helpDescription: '$/es will draw es chart',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('$/'),
  command: async (message: Message) => {
    const ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    const options = [];
    for (let i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
    const timePeriod = extractFromOptions('time_period_futures', options);
    TickerTracker.postTicker(ticker, message.author.id, 'future');

    message.channel
      .send(
        {
          files: [
            `https://elite.finviz.com/fut_chart.ashx?t=${
              ticker
            }&p=${
              timePeriod
            }&f=1`
            + `x=${Math.random()}.png`,
          ],
        },
      );
  },
};
