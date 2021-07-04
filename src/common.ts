export type OptionsKey = 'indicators' | 'chart_type' | 'time_period' | 'time_period_futures' | 'time_period_forex';

export const extractFromOptions = (key: OptionsKey, options: string[]): string => {
  if (key === 'indicators') {
    let tempIndicator = '';

    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'rsi':
          tempIndicator += ',rsi_b_14';
          break;
        case 'macd':
          tempIndicator += ',macd_b_12_26_9';
          break;
        case 'adx':
          tempIndicator += ',adx_b_14';
          break;
        case 'atr':
          tempIndicator += ',atr_b_14';
          break;
        case 'cci':
          tempIndicator += ',cci_b_20';
          break;
        case 'fi':
          tempIndicator += ',fi_b_14';
          break;
        case 'mfi':
          tempIndicator += ',mfi_b_14';
          break;
        case 'ppi':
          tempIndicator += ',perf_b_SPY_QQQ';
          break;
        case 'rwi':
          tempIndicator += ',rwi_b_9';
          break;
        case 'roc':
          tempIndicator += ',roc_b_12';
          break;
        case 'rmi':
          tempIndicator += ',rmi_b_20';
          break;
        case 'stofu':
          tempIndicator += ',stofu_b_14_3_3';
          break;
        case 'stosl':
          tempIndicator += ',stosl_b_14_3';
          break;
        case 'stofa':
          tempIndicator += ',stofa_b_14_3';
          break;
        case 'trix':
          tempIndicator += ',trix_b_9';
          break;
        case 'ult':
          tempIndicator += ',ult_b_7_14_28';
          break;
        case 'wr':
          tempIndicator += ',wr_b_14';
          break;
        case 'bb20':
          tempIndicator += ',bb_20_2';
          break;
        case 'bb50':
          tempIndicator += ',bb_50_2';
          break;
        case 'borc':
          tempIndicator += ',bb_20_2,bb_50_2';
          break;
        case 'hilo':
          tempIndicator += ',hilo_20';
          break;
        case 'ema':
          tempIndicator += ',ema_9,ema_21';
          break;
        default:
      }
    }
    if (options.includes('d') || tempIndicator !== '') {
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
  } if (key === 'chart_type') {
    let tempChartType = 'c';
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      switch (item) {
        case 'line':
          tempChartType = 'l';
          break;
        default:
      }
    }
    return tempChartType;
  } if (key === 'time_period') {
    let tempTimePeriod = 'i5';
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
        default:
      }
    }
    return tempTimePeriod;
  } if (key === 'time_period_futures') {
    let tempTimePeriod = 'm5';
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
        default:
      }
    }
    return tempTimePeriod;
  } if (key === 'time_period_forex') {
    let tempTimePeriod = 'm5';
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
        default:
      }
    }
    return tempTimePeriod;
  }
  return '';
};

export type TickerType = 'crypto' | 'forex' | undefined;

export const checkTicker = (ticker: string, type?: TickerType): boolean => {
  if (type !== undefined) {
    if (type === 'forex') {
      return /^(eur\/usd|gbp\/usd|usd\/jpy|usd\/cad|usd\/chf|aud\/usd|nzd\/usd|eur\/gbp|gbp\/jpy)/g.test(ticker);
    } if (type === 'crypto') {
      return /^(btc|ltc|eth|xrp|bch)/g.test(ticker);
    }
  }
  return !/.*\d+.*/g.test(ticker);
};
