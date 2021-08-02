import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { TickerTracker } from '../../services/tickerTracker';

export const TickerTrackerCommand: ICommand = {
  name: '!top',
  helpDescription: 'lists top tickers. optional include user to find top tickers buy user',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!top'),
  command: async (message: Message) => {
    const argument = message.content.replace('!top', '').trim();
    let tickers;

    if (argument.startsWith('<@!')) {
      tickers = await TickerTracker.getTickersByUser(10, argument.slice(3, argument.length - 1));
    } else if (TickerTracker.DateChars.has(argument)) {
      tickers = await TickerTracker.getTickersByTime(10, argument);
    } else {
      tickers = await TickerTracker.getTickers(10);
    }

    const fields = tickers.map((ticker) => (`${ticker._id.toUpperCase()}: ${ticker.count}`));

    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Top Tickers',
        description: fields.join('\n'),
      },
    });
    return Promise.resolve();
  },
};
