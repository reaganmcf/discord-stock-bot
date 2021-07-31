import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { TickerTracker } from '../../services/tickerTracker';

export const TickerTrackerCommand: ICommand = {
  name: 'Tickers',
  helpDescription: '!tickers <n>',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!tickers'),
  command: async (message: Message) => {
    const tickers = await TickerTracker.getTickers(10);

    const fields = tickers.map((ticker) => ({
      name: ticker._id,
      value: ticker.count,
    }));

    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Top Tickers',
        fields,
      },
    });
    return Promise.resolve();
  },
};
