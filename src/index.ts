import Discord from 'discord.js';

require('dotenv').config();

const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});

/**
 * Handler for garbage collecting old messages
 */
client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) return;
  if (reaction.emoji.name !== '❌') return;
  if (reaction.message.author.id == process.env.TOKEN) reaction.message.delete();
});

client.on('message', (message) => {
  const catcher = isStockChartsInterceptor(message.content);
  if (catcher) {
    console.log('caught intercept');
    console.log(catcher);
    message.channel
      .send('', {
        files: [catcher.ticker.url],
      });
  } else if (message.content == '$help') {
    const m =			'fsb-ticker. Developed by BuffMan \n\n Example commands: \n `$avgo`\n `$aapl w`\n `$tsla d rsi macd`\n `$spy line`\n `$/es`\n `$.btc`\n `$usd/jpy w`\n `$sectors ytd`\n\n'
			+ '**Currently Scheduled Features**\n'
			+ '- RTF Description be more detailed\n\n'
			+ '_Contact BuffMan for more info and any feature requests_\n';
    message.channel.send(m);
  } else if (message.content.startsWith('$.')) {
    console.log('CRYPTO');
    const ticker = message.content.toLowerCase().split(' ')[0].substring(2);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    const options = [];
    for (var i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
    const timePeriod = extractFromOptions('time_period_forex', options);
    console.log(`https://elite.finviz.com/fx_image.ashx?${ticker}usd_${timePeriod}_l.png`);
    if (checkTicker(ticker, 'crypto')) {
      message.channel
        .send('', {
          files: [`https://elite.finviz.com/fx_image.ashx?${ticker}usd_${timePeriod}_l.png`],
        });
    }
  } else if (message.content.includes('/') && message.content.indexOf('/') != 1) {
    console.log('FOREX');
    const ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    const options = [];
    for (var i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
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
  } else if (message.content.startsWith('$sectors')) {
    console.log('SECTORS');
    const rawOptions = message.content.toLowerCase().split(' ');
    let rawTimePeriod = 'day';
    if (rawOptions.length > 1) {
      rawTimePeriod = rawOptions[1];
    }

    message.channel.send('Finviz has cut support for this feature. RIP $sectors', {});
  } else if (message.content.startsWith('$/')) {
    console.log('FUTURES');
    const ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].substring(1).split(' ');
    console.log(rawOptions);
    const options = [];
    for (var i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
    // get time period
    const timePeriod = extractFromOptions('time_period_futures', options);
    console.log(`timePeriod: ${timePeriod}`);
    if (checkTicker(ticker)) {
      message.channel
        .send(
          {
			  files: [
              `Futures ${ticker.toUpperCase()}`,
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
  } else if (message.content.startsWith('$')) {
    const ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].split(' ');
    const options = [];
    for (var i = 1; i < rawOptions.length; i++) options.push(rawOptions[i]);
    console.log(options);
    let timePeriod = extractFromOptions('time_period', options);
    const chartType = extractFromOptions('chart_type', options);
    const additionalIndicators = extractFromOptions('indicators', options);
    if (additionalIndicators.length != 0) timePeriod = 'd';

    const rand = Math.random();
    console.log(
      `https://elite.finviz.com/chart.ashx?t=${
				 ticker
				 }&ty=${
				 chartType
				 }${timePeriod == 'd' ? `&ta=st_c,sch_200p${additionalIndicators}` : ''
				 }&p=${
				 timePeriod
				 }&s=l`
				+ `x=${Math.random()}.png`,
    );
    if (checkTicker(ticker)) {
      message.channel
        .send(
          {
			  files: [
              `${ticker.toUpperCase()}`,
              `https://elite.finviz.com/chart.ashx?t=${
							 ticker
							 }&ty=${
							 chartType
							 }${timePeriod == 'd' ? `&ta=st_c,sch_200p${additionalIndicators}` : ''
							 }&p=${
							 timePeriod
							 }&s=l`
							+ `x=${Math.random()}.png`,
            ],
          },
        );
    }
  }
});

const checkTicker = (ticker: string, type_check?: 'crypto' | 'forex') => {
  if (type_check != null) {
    if (type_check == 'forex') {
      return /^(eur\/usd|gbp\/usd|usd\/jpy|usd\/cad|usd\/chf|aud\/usd|nzd\/usd|eur\/gbp|gbp\/jpy)/g.test(ticker);
    } if (type_check == 'crypto') {
      return /^(btc|ltc|eth|xrp|bch)/g.test(ticker);
    }
  }
  return !/.*\d+.*/g.test(ticker);
};

const isStockChartsInterceptor = (content: any): any => {
  // $SSEC, $HSCEI, $NIKK, $DAX, $USB_T
  const VALID_INTERCEPTORS = [
    {
      ticker: 'SSEC',
      url: 'https://c.stockcharts.com/c-sc/sc?s=%24SSEC&p=D&b=5&g=0&i=t2208916711c&h=0.png',
    },
    {
      ticker: 'HSCEI',
      url: 'https://c.stockcharts.com/c-sc/sc?s=%24HSCEI&p=D&b=5&g=0&i=t2208916711c&h=0.png',
    },
    {
      ticker: 'NIKK',
      url: 'https://c.stockcharts.com/c-sc/sc?s=%24NIKK&p=D&b=5&g=0&i=t2208916711c&h=0.png',
    },
    {
      ticker: 'DAX',
      url: 'https://c.stockcharts.com/c-sc/sc?s=%24DAX&p=D&b=5&g=0&i=t2208916711c&h=0.png',
    },
    {
      ticker: 'USB_T',
      url: 'https://c.stockcharts.com/c-sc/sc?s=%24USB&p=D&b=5&g=0&i=t2208916711c&h=0.png',
    },
  ];

  if (!content.includes('$')) return false;

  // $ssec 15 rsi
  // $ups
  const tickerName = content.split('$')[1].split(' ')[0].toUpperCase();
  console.log(`163:${tickerName}`);
  for (let i = 0; i < VALID_INTERCEPTORS.length; i++) {
    const intec = VALID_INTERCEPTORS[i];
    if (intec.ticker === tickerName) {
      return { valid: true, ticker: intec };
    }
  }

  return false;
};

const extractFromOptions = (key: any, options: any): String => {
  if (key == 'indicators') {
    let tempIndicator = '';

    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'rsi':
          tempIndicator += ',' + 'rsi_b_14';
          break;
        case 'macd':
          tempIndicator += ',' + 'macd_b_12_26_9';
          break;
        case 'adx':
          tempIndicator += ',' + 'adx_b_14';
          break;
        case 'atr':
          tempIndicator += ',' + 'atr_b_14';
          break;
        case 'cci':
          tempIndicator += ',' + 'cci_b_20';
          break;
        case 'fi':
          tempIndicator += ',' + 'fi_b_14';
          break;
        case 'mfi':
          tempIndicator += ',' + 'mfi_b_14';
          break;
        case 'ppi':
          tempIndicator += ',' + 'perf_b_SPY_QQQ';
          break;
        case 'rwi':
          tempIndicator += ',' + 'rwi_b_9';
          break;
        case 'roc':
          tempIndicator += ',' + 'roc_b_12';
          break;
        case 'rmi':
          tempIndicator += ',' + 'rmi_b_20';
          break;
        case 'stofu':
          tempIndicator += ',' + 'stofu_b_14_3_3';
          break;
        case 'stosl':
          tempIndicator += ',' + 'stosl_b_14_3';
          break;
        case 'stofa':
          tempIndicator += ',' + 'stofa_b_14_3';
          break;
        case 'trix':
          tempIndicator += ',' + 'trix_b_9';
          break;
        case 'ult':
          tempIndicator += ',' + 'ult_b_7_14_28';
          break;
        case 'wr':
          tempIndicator += ',' + 'wr_b_14';
          break;
        case 'bb20':
          tempIndicator += ',' + 'bb_20_2';
          break;
        case 'bb50':
          tempIndicator += ',' + 'bb_50_2';
          break;
        case 'borc':
          tempIndicator += ',' + 'bb_20_2,bb_50_2';
          break;
        case 'hilo':
          tempIndicator += ',' + 'hilo_20';
          break;
        case 'ema':
          tempIndicator += ',' + 'ema_9,ema_21';
          break;
      }
    }
    if (options.includes('d') || tempIndicator != '') {
      if (
        !options.includes('bb20')
				&& !options.includes('bb50')
				&& !options.includes('borc')
				&& !options.includes('ema')
      ) {
        tempIndicator += ',sma_50,sma_200,sma_20';
      }
    }

    return tempIndicator;
  } if (key == 'chart_type') {
    let tempChartType = 'c';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'line':
          tempChartType = 'l';
          break;
      }
    }
    return tempChartType;
  } if (key == 'time_period') {
    var tempTimePeriod = 'i5';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'm':
          tempTimePeriod = 'm';
          break;
        case 'w':
          tempTimePeriod = 'w';
          break;
        case 'd':
          tempTimePeriod = 'd';
          break;
        case '15':
          tempTimePeriod = 'i15';
          break;
        case '3':
          tempTimePeriod = 'i3';
          break;
      }
    }
    return tempTimePeriod;
  } if (key == 'time_period_futures') {
    var tempTimePeriod = 'm5';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'h':
          tempTimePeriod = 'h1';
          break;
        case 'd':
          tempTimePeriod = 'd1';
          break;
        case 'w':
          tempTimePeriod = 'w1';
          break;
        case 'm':
          tempTimePeriod = 'm1';
          break;
      }
    }
    return tempTimePeriod;
  } if (key == 'time_period_forex') {
    var tempTimePeriod = 'm5';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'h':
          tempTimePeriod = 'h1';
          break;
        case 'd':
          tempTimePeriod = 'd1';
          break;
        case 'w':
          tempTimePeriod = 'w1';
          break;
        case 'm':
          tempTimePeriod = 'mo';
          break;
      }
    }
    return tempTimePeriod;
  } if (key == 'time_period_sector') {
    tempTimePeriod = 't';
    switch (options) {
      case 'w':
        tempTimePeriod = 'w';
        break;
      case 'm':
        tempTimePeriod = 'm';
        break;
      case 'q':
        tempTimePeriod = 'q';
        break;
      case 'h':
        tempTimePeriod = 'h';
        break;
      case 'y':
        tempTimePeriod = 'y';
        break;
      case 'ytd':
        tempTimePeriod = 'ytd';
        break;
    }
    return tempTimePeriod;
  }
};

client.login(process.env.TOKEN);
