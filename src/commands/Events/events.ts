import { Message } from 'discord.js';

import { ICommand } from '../../icommand';
import { getFinvizEventsTable } from './finviz-events';

const impact = ['', 'Low', 'Medium', 'High'];

export const EventsCommand: ICommand = {
  name: 'Events',
  helpDescription: '!events shows a list of market events for the day',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!events'),
  command: async (message: Message) => {
    const table = await getFinvizEventsTable();
    // eslint-disable-next-line no-nested-ternary
    table.sort((a, b) => ((a.impact < b.impact) ? 1 : ((b.impact < a.impact) ? -1 : 0)));
    const fields = table.map((value) => ({
      name: value.release,
      value: `${value.date} ${value.time} Impact: ${impact[value.impact]} Expected: ${value.expected} Prior: ${value.prior}`,
    }));

    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Market Events',
        fields,
      },
    });
    return Promise.resolve();
  },
};
