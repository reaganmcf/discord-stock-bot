import 'jasmine';

import {
  extractFromOptions, OptionsKey
} from './common';

describe('Common', () => {
  interface TestData {
    key: OptionsKey;
    options: any;
    result: string;
  }
  const testData: TestData[] = [
    { key: 'indicators', options: ['rsi'], result: ',rsi_b_14,sma_50,sma_200,sma_20' },
    { key: 'indicators', options: [], result: '' },
    { key: 'chart_type', options: ['line'], result: 'l' },
    { key: 'chart_type', options: [], result: 'c' },
    { key: 'time_period', options: ['m'], result: 'm' },
    { key: 'time_period', options: [], result: 'i5' },
    { key: 'time_period_futures', options: ['d'], result: 'd1' },
    { key: 'time_period_forex', options: ['w'], result: 'w1' },
  ];

  testData.forEach((i) => it(`extractFromOptions ${i.key} ${i.options}`, () => {
    expect(extractFromOptions(i.key, i.options)).toBe(i.result);
  }));
});
