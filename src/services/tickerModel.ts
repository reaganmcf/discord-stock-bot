import { Schema, model } from 'mongoose';

type TickerType = 'stock' | 'forex' | 'crypto' | 'future';

// 1. Create an interface representing a document in MongoDB.
interface Ticker {
  name: string;
  date: number;
  user: string;
  type: TickerType;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Ticker>({
  name: { type: String, required: true },
  date: { type: Number, required: true },
  user: { type: String, required: true },
  type: { type: String, enum: ['stock', 'forex', 'crypto', 'future'] },
});

// 3. Create a Model.
const TickerModel = model<Ticker>('Ticker', schema);
export { TickerModel, Ticker, TickerType };
