import { TickerModel, TickerType } from './tickerModel';

interface TopTickers {
    _id: string;
    count: number;
}

export class TickerTracker {
  static async postTicker(name: string, user: string, type: TickerType): Promise<void> {
    const doc = new TickerModel({
      name: name.trim(), date: Date.now(), user, type,
    });
    await doc.save();
  }

  static async getTickers(count: number): Promise<TopTickers[]> {
    const tickers = await TickerModel.aggregate([
      {
        $sortByCount: '$name',
      },
      {
        $limit: count,
      },
    ]).exec();

    return tickers;
  }

  static DateChars = new Map([
    ['d', 1],
    ['w', 7],
    ['m', 30],
    ['y', 365],
  ]);

  static async getTickersByTime(count: number, date: string): Promise<TopTickers[]> {
    const d = new Date();
    d.setDate(d.getDate() - TickerTracker.DateChars.get(date));
    const tickers = await TickerModel.aggregate([
      {
        $match: { date: { $gt: d.valueOf() } },
      },
      {
        $sortByCount: '$name',
      },
      {
        $limit: count,
      },
    ]).exec();

    return tickers;
  }

  static async getTickersByUser(count: number, user: string): Promise<TopTickers[]> {
    const tickers = await TickerModel.aggregate([
      {
        $match: { user },
      },
      {
        $sortByCount: '$name',
      },
      {
        $limit: count,
      },
    ]).exec();

    return tickers;
  }
}
