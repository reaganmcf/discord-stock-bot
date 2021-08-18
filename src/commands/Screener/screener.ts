import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { getFinvizScreenWholeTable } from './finviz-screener';

const breakingOut = 'https://finviz.com/screener.ashx?v=141&f=fa_debteq_u1,fa_roe_o20,sh_avgvol_o100,ta_highlow50d_nh,ta_sma20_pa,ta_sma200_pa,ta_sma50_pa&ft=4&o=-perf1w';

export const ScreenerCommand: ICommand = {
  name: 'Screener',
  helpDescription: '!screener finviz url',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!screener'),
  command: async (message: Message) => {
    const url = message.content.replace('!screener', '').trim();
    const table = await getFinvizScreenWholeTable(url);
    const arrayLength = Math.min(table.length, 5);
    const fields = table.slice(0, arrayLength).map((value) => ({
      name: value.ticker,
      value: `Price: ${value.price} Avg Volume: ${value.avgvolume}`,
    }));

    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Custom Screener',
        url,
        fields,
      },
    });
  },
};

export const BreakoutCommand: ICommand = {
  name: 'Breakout',
  helpDescription: '!breakout lists stocks breaking out',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!breakout'),
  command: async (message: Message) => {
    const table = await getFinvizScreenWholeTable(breakingOut);
    const arrayLength = Math.min(table.length, 5);
    const fields = table.slice(0, arrayLength).map((value) => ({
      name: value.ticker,
      value: `Price: ${value.price} Avg Volume: ${value.avgvolume} Perf Week: ${value.perfweek}`,
    }));

    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Stock Breakout',
        url: breakingOut,
        fields,
      },
    });

    return Promise.resolve();
  },
};

export const WinnersCommand: ICommand = {
  name: 'Winners',
  helpDescription: '!winners top winners of the day',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!winners'),
  command: async (message: Message) => {
    const url = 'https://finviz.com/screener.ashx?v=110&s=ta_topgainers';
    const table = await getFinvizScreenWholeTable(url);
    const arrayLength = Math.min(table.length, 10);
    const fields = table.slice(0, arrayLength).map((value) => ({
      name: value.ticker,
      value: `Price: ${value.price} Change: ${value.change}`,
    }));

    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Winners',
        url,
        fields,
      },
    });

    return Promise.resolve();
  },
};

export const LosersCommand: ICommand = {
  name: 'Losers',
  helpDescription: '!losers top Losers of the day',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('!losers'),
  command: async (message: Message) => {
    const url = 'https://finviz.com/screener.ashx?v=110&s=ta_toplosers';
    const table = await getFinvizScreenWholeTable(url);
    const arrayLength = Math.min(table.length, 10);
    const fields = table.slice(0, arrayLength).map((value) => ({
      name: value.ticker,
      value: `Price: ${value.price} Change: ${value.change}`,
    }));

    message.channel.send({
      embed: {
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL,
        },
        color: 3447003,
        title: 'Losers',
        url,
        fields,
      },
    });

    return Promise.resolve();
  },
};
