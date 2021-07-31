import 'jasmine';

import { Message } from 'discord.js';
import { FuturesCommand } from './futures';
import { TickerTracker } from '../../services/tickerTracker';

describe('crypto', () => {
  interface TestData {
    msg: string;
    result: boolean;
  }
  const testData: TestData[] = [
    { msg: '$/es', result: true },
    { msg: '$/es rsi macd 5m', result: true },
    { msg: '$spy', result: false },
    { msg: '$.btc', result: false },
    { msg: '$123', result: false },
    { msg: 'tim $.btc', result: false },
    { msg: 'tim aapl', result: false },
  ];

  testData.forEach((i) => it('tigger', () => {
    const spy = jasmine.createSpyObj<Message>('message', ['content']);
    spy.content = i.msg;
    expect(FuturesCommand.trigger(spy)).toBe(i.result);
  }));

  it('should send message', async () => {
    spyOn(TickerTracker, 'postTicker');
    const spy = jasmine.createSpyObj<Message>('message', ['content', 'channel', 'author']);
    spy.content = '$/es';
    const msgSpy = jasmine.createSpy();
    spy.channel.send = msgSpy;
    await FuturesCommand.command(spy);
    expect(spy.channel.send).toHaveBeenCalled();
  });
});
