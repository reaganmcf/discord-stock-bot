# Discord Stock Bot
I made this for a private stock trading discord group I run. This was initially just thrown together and I have plenty of enhancements and features planned.

**If you have any features you would like implemented, please submit a new issue with the _Feature Request_ label and I will respond :\)**

## Example Chart
![](https://cdn.discordapp.com/attachments/563555590086066188/587663025054547971/chart.ashxttmotyctast_csch_200psma_50sma_200sma_20rsi_b_14macd_b_12_26_9pdslrev1560172643487.png)

### Example Commands
- `$avgo` -> Show 5 min AVGO chart
- `$aapl w`-> Show weekly AAPL chart
- `$tsla rsi macd` -> Show RSI and MACD indicators on TSLA daily chart
- `$spy line` -> Show 5 min SPY line chart
- `$/es` -> Show 5 min S&P 500 Furtures chart
- `$.btc` -> Show 5 min BTC chart
- `$usd/jpy w` -> Show USD/JPY Forex weekly chart

## Stocks, Indices, and Equities
- Example:
`$tsla rsi mfi`
![TSLA Daily with RSI and MFI](https://cdn.discordapp.com/attachments/563558685608116254/589570549412397083/chart.ashxttslatyctast_csch_200psma_50sma_200sma_20mfi_b_14rsi_b_14pdslrev1560172643487.png)
- Available Parameters
    - Indicators
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
        - `ema` -> Exponential Moving Average. Default settings are `9, 21`
        - `bb_20` -> 20 Period Bollinger Bands. Default settings are `2`
        - `bb_50` -> 50 Period Bollinger Bands. Default settings are `2`
        - `hilo` -> High / Low Channel. Default settings are `20`
    - Chart Types
        - `candle` -> default
        - `line` -> Shows line chart rather than candles
    - Time Intervals
        - `3` -> 3 minute
        - `5` -> 5 minute (Default)
        - `15` -> 15 minute
        - `d` -> Daily
        - `w` -> Weekly
        - `m` -> Monthly

## Futures
- Currently supports [48 Futures / Commodities](https://elite.finviz.com/futures_charts.ashx)
- Example:
`$/es m`
![ES Monthly Chart](https://cdn.discordapp.com/attachments/563558685608116254/589569415339704330/espm1rev1560172643487.png)
- Available Parameters
    - Time Intervals
        - `5` -> 5 minute (Default)
        - `h` -> Hourly
        - `d` -> Daily
        - `w` -> Weekly 

## Crypto
- Currently supports
    - `btc` -> Bitcoin
    - `ltc` -> LiteCoin
    - `eth` -> Ethereum
    - `xrp` -> Ripple
    - `bch` -> Bitcoin Cash
- Example:
`$.btc w`
![Bitcoin Weekly Chart](https://cdn.discordapp.com/attachments/563558685608116254/589571839848611840/fx_image.ashxbtcusd_w1_l.png)
- Available Parameters
    - Time Intervals
        - `5` -> 5 minute (Default)
        - `h` -> Hourly
        - `d` -> Daily
        - `w` -> Weekly 

## Forex
- Currently supports [10 Currency Pairs](https://elite.finviz.com/forex_charts.ashx)
- Example:
`$usd/jpy w`
![Weekly USD/JPY Chart](https://cdn.discordapp.com/attachments/563558685608116254/589574723760029707/fx_image.ashxusdjpy_w1_l.png)
- Available Parameters
    - Time Intervals
        - `5` -> 5 minute (Default)
        - `h` -> Hourly
        - `d` -> Daily
        - `m` -> Monthly


## Setup

1. Clone the repository to whichever hosting service you prefer
1. Create .env file in the root folder. Add TOKEN= ****  with the discord bot key
1. Run `npm i`
1. Run `npm run build` 
1. Run `npm start`
