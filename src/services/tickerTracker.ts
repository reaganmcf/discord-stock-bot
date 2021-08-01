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
