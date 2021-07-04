import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { extractFromOptions, checkTicker } from '../../common';

export const ForexCommand: ICommand = {
  name: 'Forex',
  helpDescription: '$usd/jpy w',
  showInHelp: true,
  trigger: (msg: Message) => msg.cleanContent.startsWith('$') && msg.cleanContent.includes('/') && msg.cleanContent.indexOf('/') != 1,
  command: async (message: Message) => {
    const ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    const options = [];
    for (let i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
    const timePeriod = extractFromOptions('time_period_forex', options);
    console.log(
      `https://elite.finviz.com/fx_image.ashx?${ticker.split('/').join('')}_${timePeriod}_l.png`,
    );
    if (checkTicker(ticker, 'forex')) {
      message.channel
        .send('', {
          files: [
            `https://elite.finviz.com/fx_image.ashx?${
							 ticker.split('/').join('')
							 }_${
							 timePeriod
							 }_l.png`,
          ],
        });
    }
  },
};
