import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { getCompanyFA } from './finviz-fa';

export const FACommand: ICommand = {
  name: 'Fundamental Analysis',
  helpDescription: '!fa aapl',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!fa'),
  command: async (message: Message) => {
    const ticker = message.content.replace('!fa', '').trim();
    const fa_num = await getCompanyFA(ticker);
	
    message.channel.send({
      embed: {
        color: 3447003,
        title: ticker.toUpperCase(),
		description: 'The following values are all taken from finviz.com',
        fields: [
          { name: 'EPS (ttm)', value: fa_num.epsttm, inline: true },
		  { name: 'EPS QoQ', value: fa_num.epsqoq, inline: true },
		  { name: 'Estimated EPS next Q', value: fa_num.epsnextq, inline: true },
		  { name: 'P/E (ttm)', value: fa_num.pe, inline: true},
		  { name: 'Forward P/E', value: fa_num.fpe, inline: true },
		  { name: '\u200b', value: '\u200b', inline: true },
		  { name: 'P/S (ttm)', value: fa_num.ps, inline: true },
		  { name: 'Sales (QoQ)', value: fa_num.salesqoq, inline: true },
		  { name: 'P/FCF (ttm)', value: fa_num.pfcf, inline: true },
		  { name: 'Yearly dividend', value: fa_num.divi, inline: true },
		  { name: 'Yearly dividend %', value: fa_num.diviperc, inline: true },
		  { name: '\u200b', value: '\u200b', inline: true },
		  { name: 'Earnings date', value: fa_num.erdate },
        ],
      },
    });
    return Promise.resolve();
  },
};
