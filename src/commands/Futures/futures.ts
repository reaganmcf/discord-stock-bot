import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { extractFromOptions, checkTicker } from '../../common';

export const FuturesCommand: ICommand = {
  name: 'Fuctures',
  helpDescription: '$/es will draw es chart',
  showInHelp: true,
  trigger: (msg: Message) => msg.content.startsWith('$/'),
  command: async (message: Message) => {
    const ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    console.log(rawOptions);
    const options = [];
    for (let i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
    // get time period
    const timePeriod = extractFromOptions('time_period_futures', options);
    console.log(`timePeriod: ${timePeriod}`);
    if (checkTicker(ticker)) {
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
    }
  },
};
