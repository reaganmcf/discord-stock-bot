import got from 'got';
import NodeCache from 'node-cache';

export interface Ticker {
  TICKER: string;
  MEAN_SPOT: string;
  MEAN: number;
  VOL_PCT: number;
  DATE: string;
}

export const getLatest = async (cache: NodeCache): Promise<Ticker[]> => {
  let result = cache.get('latestSQ') as Ticker[];
  if (result === undefined) {
    result = await got(`${process.env.SQ_URI}/latest?key=${process.env.SQ_KEY}`).json() as Ticker[];
    const success = cache.set('latestSQ', result, 3600);
    console.log('saved to cache: ', success);
  }

  return result;
};

export const getBest = async (cache: NodeCache): Promise<Ticker[]> => {
  let result = cache.get('bestSQ') as Ticker[];
  if (result === undefined) {
    result = await got(`${process.env.SQ_URI}/screen/best?key=${process.env.SQ_KEY}`).json() as Ticker[];
    const success = cache.set('bestSQ', result, 3600);
    console.log('saved to cache: ', success);
  }

  const latest = await getLatest(cache);
  const best: Ticker[] = [];
  result.forEach((value) => {
    const latestTicker = latest.find((v) => v.TICKER === value.TICKER);
    best.push(latestTicker);
  });

  return best;
};

export const getWorst = async (cache: NodeCache): Promise<Ticker[]> => {
  let result = cache.get('worstSQ') as Ticker[];
  if (result === undefined) {
    result = await got(`${process.env.SQ_URI}/screen/worst?key=${process.env.SQ_KEY}`).json() as Ticker[];
    const success = cache.set('worstSQ', result, 3600);
    console.log('saved to cache: ', success);
  }

  const latest = await getLatest(cache);
  const worst: Ticker[] = [];
  result.forEach((value) => {
    const latestTicker = latest.find((v) => v.TICKER === value.TICKER);
    worst.push(latestTicker);
  });

  return worst;
};

export const getTicker = async (ticker: string, cache: NodeCache): Promise<Ticker> => {
  const latest = await getLatest(cache);
  

  return latest.find((v) => v.TICKER === ticker.toUpperCase());
};
