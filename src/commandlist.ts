import { ICommand } from './icommand';
import { FuturesCommand } from './commands/Futures';
import { CryptoCommand } from './commands/Crypto';
// import { ForexCommand } from './commands/Forex';
import { StocksCommand, StocksC4, StocksC2 } from './commands/Stocks';
import {
  ScreenerCommand, BreakoutCommand, WinnersCommand, LosersCommand,
} from './commands/Screener';
import { HelpCommand } from './commands/Help';
import { EventsCommand } from './commands/Events';
import { TickerTrackerCommand } from './commands/TickerTracker';
import { InfoCommand } from './commands/Info';

export const commandList: ICommand[] = [
  FuturesCommand,
  CryptoCommand,
  // ForexCommand,  DISABLE the FOREX command. it needs a better trigger
  StocksCommand,
  ScreenerCommand,
  BreakoutCommand,
  HelpCommand,
  StocksC4,
  StocksC2,
  EventsCommand,
  TickerTrackerCommand,
  LosersCommand,
  WinnersCommand,
  InfoCommand,
];
