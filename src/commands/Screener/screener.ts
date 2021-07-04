import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { getFinvizScreen } from './finviz-screener';

const breakingOut = 'https://finviz.com/screener.ashx?v=141&f=fa_debteq_u1,fa_roe_o20,sh_avgvol_o100,ta_highlow50d_nh,ta_sma20_pa,ta_sma200_pa,ta_sma50_pa&ft=4&o=-perf1w';

export const ScreenerCommand: ICommand = {
  name: 'Screener',
  helpDescription: '!screener finviz url',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!screener'),
  command: async (message: Message) => {
    const url = message.content.replace('!screener', '').trim();
    getFinvizScreen(url).then((result) => {
      message.channel.send(` \`\`\` ${result} \`\`\` `);
    });
    return Promise.resolve();
  },
};

export const BreakoutCommand: ICommand = {
  name: 'Breakout',
  helpDescription: '!breakout lists stocks breaking out',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!breakout'),
  command: async (message: Message) => {
    getFinvizScreen(breakingOut).then((result) => {
      message.channel.send(` \`\`\` ${result} \`\`\` `);
    });
    return Promise.resolve();
  },
};
