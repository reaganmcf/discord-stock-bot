import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { getSymbolInfo } from './stockcharts-info';

export const InfoCommand: ICommand = {
  name: 'Info',
  helpDescription: '!info aapl',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!info'),
  command: async (message: Message) => {
    const ticker = message.content.replace('!info', '').trim();
    const info = await getSymbolInfo(ticker);

    message.channel.send({
      embed: {
        color: 3447003,
        title: ticker.toUpperCase(),
        fields: [
          { name: 'Price', value: info.close },
        ],
      },
    });
    return Promise.resolve();
  },
};
