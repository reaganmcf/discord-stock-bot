import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { extractFromOptions, checkTicker } from '../../common';

export const CryptoCommand: ICommand = {
  name: 'Crypto',
  helpDescription: '$.{XXX} example $.btc will draw a BTC chart',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('$.'),
  command: async (message: Message) => {
    const ticker = message.content.toLowerCase().split(' ')[0].substring(2);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    const options = [];
    for (let i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
    const timePeriod = extractFromOptions('time_period_forex', options);
    console.log(`https://elite.finviz.com/fx_image.ashx?${ticker}usd_${timePeriod}_l.png`);
    if (checkTicker(ticker, 'crypto')) {
      message.channel
        .send('', {
          files: [`https://elite.finviz.com/fx_image.ashx?${ticker}usd_${timePeriod}_l.png`],
        });
    }
  },
};
