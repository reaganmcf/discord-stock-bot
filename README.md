# Discord Stock Bot
I made this for a private stock trading discord group I run. This was initially just thrown together and I have plenty of enhancements and features planned.

**If you have any features you would like implemented, please submit a new issue with the _Feature Request_ label and I will respond :\)**

## Setup

1. Clone the repository to whichever hosting service you prefer
2. Rename `example-config.js` to `config.js`, and replace the fields with your information
3. Run `npm install`
3. Run `node index.js`

## Help

### Example Commands
`$avgo` - Show 5 min AVGO chart
`$aapl w`- Show weekly AAPL chart
`$tsla rsi macd` Show RSI and MACD indicators on TSLA daily chart
`$spy line` Show 5 min SPY line chart
`$/es` Show 5 min S&P 500 Furtures chart

### Chart Types
- `line` -> Shows line chart rather than candles

### Time Intervals
- Futures
    - `5` -> 5 minute (Default)
    - `h` -> Hourly
    - `d` -> Daily
    - `w` -> Weekly
- Stocks, Indices, and Equities
    - `3` -> 3 minute
    - `5` -> 5 minute (Default)
    - `15` -> 15 minute
    - `d` -> Daily
    - `w` -> Weekly
    - `m` -> Monthly

### Indicators
_Note: Indicators can only be applied to daily charts_
- `rsi` -> Relative Strength Index. Default settings are `14`
- `macd` -> Moving Average Convergence / Divergense. Default settings are `12, 26, 9`
- `adx` -> Average Directional Index. Default settings are `14`
- `atr` -> Average True Rage. Default settings are `14`
- `cci` -> Commodity Channel Index. Default settings are `20`
- `fi` -> Force Index. Default settings are `14`
- `mfi` -> Money Flow Index. Default settings are `14`
- `ppi` -> Price Performance %. Default settings are `SPY and QQQ`
- `rwi` -> Random Walk Index. Default settings are `9`
- `roc` -> Rate of Change. Default settings are `12`.
- `rmi` -> Relative Momentum Index. Default settings are `20`
- `stofu` -> Stochastics Full. Default settings are `14, 3, 3`
- `stofsl` -> Stochastics Slow. Default settings are `14, 3`
- `stofa` -> Stochastics Fast. Default settings are `14, 3`
- `trix` -> Triple Exponential Moving Average. Default settings are `9`
- `ult` -> Ultimate Oscillator. Default settings are `7, 14, 28`
- `wr` -> Williams %R. Default settings are `14`