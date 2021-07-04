import { ICommand } from './icommand';
import { FuturesCommand } from './commands/Futures';
import { CryptoCommand } from './commands/Crypto';
// import { ForexCommand } from './commands/Forex';
import { StocksCommand } from './commands/Stocks';

export const commandList: ICommand[] = [
  FuturesCommand,
  CryptoCommand,
  // ForexCommand,  DISABLE the FOREX command. it needs a better trigger
  StocksCommand,
];
