import 'jasmine';

import { Message } from 'discord.js';
import { StocksCommand } from './stocks';
import { TickerTracker } from '../../services/tickerTracker';

describe('stocks', () => {
  interface TestData {
    msg: string;
    result: boolean;
  }
  const testData: TestData[] = [
    { msg: '$tsla', result: true },
    { msg: '$spy rsi macd 5m', result: true },
    { msg: '$.dtc', result: false },
    { msg: '$/es', result: false },
    { msg: '$123', result: false },
    { msg: 'tim $aapl', result: false },
    { msg: 'tim aapl', result: false },
  ];

  testData.forEach((i) => it('tigger', () => {
    const spy = jasmine.createSpyObj<Message>('message', ['content']);
    spy.content = i.msg;
    expect(StocksCommand.trigger(spy)).toBe(i.result);
  }));

  it('should send message', async () => {
    spyOn(TickerTracker, 'postTicker');
    const spy = jasmine.createSpyObj<Message>('message', ['content', 'channel', 'author']);
    spy.content = '$aapl';
    const msgSpy = jasmine.createSpy();
    spy.channel.send = msgSpy;
    await StocksCommand.command(spy);
    expect(spy.channel.send).toHaveBeenCalled();
  });
});
