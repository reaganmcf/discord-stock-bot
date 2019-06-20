import React from 'react';
import ReactMarkdown from 'react-markdown';
import logo from './logo.svg';
import './App.css';

let body1 =
	'' +
	'- Available Parameters \n' +
	'   - Indicators (up to 2) \n' +
	'       - `rsi` -> Relative Strength Index. Default settings are `14` \n' +
	'       - `macd` -> Moving Average Convergence / Divergence. Default settings are `12, 26, 9` \n' +
	'       - `adx` -> Average Directional Index. Default settings are `14` \n' +
	'       - `atr` -> Average True Range. Default settings are `14` \n' +
	'       - `cci` -> Commodity Channel Index. Default settings are `20` \n ' +
	'       - `fi` -> Force Index. Default settings are `14` \n' +
	'       - `mfi` -> Money Flow Index. Default settings are `14` \n' +
	'       - `ppi` -> Price Performance %. Default settings are `SPY and QQQ` \n' +
	'       - `rwi` -> Random Walk Index. Default settings are `9` \n';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<p className="headerName">
					<code
						style={{
							backgroundColor: 'white',
							flex: 1,
							color: 'black',
							padding: 20,
							borderRadius: 20,
							boxShadow: 'grey -1px -2px 20px'
						}}
					>
						discord-stock-bot
					</code>
				</p>
				<p className="miniHeaderText">A Discord Bot for Stock/Options Trading Groups</p>
			</header>
			<body>
				<div
					style={{
						// textAlign: 'center',
						minHeight: '30vh',
						display: 'flex',
						flexDirection: 'row',
						backgroundColor: 'white'
					}}
				>
					<div
						style={{
							flex: 1,
							marginLeft: 20,
							marginRight: -20
						}}
					>
						<div className="headerContainer">
							<text className="headerText">Stocks, Indices and Equities</text>
						</div>
						<div className="bodyText" style={{ textAlign: 'center' }}>
							{/* <ReactMarkdown source={body1} /> */}
							Query charts for any stock, index, or equity! You can query for particular time interval,
							chart types, and even automatically include indicators and trendlines.
							<br />
							<br />
							For a list of all supported indicators and time interval syntax, make sure to check out the
							Github page
						</div>
					</div>
					<div
						style={{
							flex: 1,
							backgroundColor: '#3a506b',
							borderRadius: 20,
							maxWidth: '40%',
							margin: 30,
							boxShadow: 'black 5px 5px 20px'
						}}
					>
						<div style={{ flex: 1, marginTop: 20 }}>
							<code
								style={{
									backgroundColor: 'white',
									flex: 1,
									color: 'black',
									padding: 5,
									borderRadius: 5,
									boxShadow: 'grey 1px 2px 20px'
								}}
							>
								$tsla d mfi rsi
							</code>
						</div>
						<div style={{ margin: 20 }}>
							<img
								style={{ maxWidth: '90%', height: 'auto' }}
								src="https://cdn.discordapp.com/attachments/563558685608116254/589570549412397083/chart.ashxttslatyctast_csch_200psma_50sma_200sma_20mfi_b_14rsi_b_14pdslrev1560172643487.png"
							/>
						</div>
					</div>
				</div>
				<div
					style={{
						// textAlign: 'center',
						minHeight: '30vh',
						display: 'flex',
						flexDirection: 'row',
						backgroundColor: 'white'
					}}
				>
					<div
						style={{
							flex: 1,
							backgroundColor: '#3a506b',
							borderRadius: 20,
							maxWidth: '40%',
							margin: 30,
							boxShadow: 'black 5px 5px 20px'
						}}
					>
						<div style={{ flex: 1, marginTop: 20 }}>
							<code
								style={{
									backgroundColor: 'white',
									flex: 1,
									color: 'black',
									padding: 5,
									borderRadius: 5,
									boxShadow: 'grey 1px 2px 20px'
								}}
							>
								$tsla d macd rsi
							</code>
						</div>
						<div style={{ margin: 20 }}>
							<img
								style={{ maxWidth: '90%', height: 'auto' }}
								src="https://cdn.discordapp.com/attachments/563558685608116254/589570549412397083/chart.ashxttslatyctast_csch_200psma_50sma_200sma_20mfi_b_14rsi_b_14pdslrev1560172643487.png"
							/>
						</div>
					</div>
					<div
						style={{
							flex: 1,
							marginLeft: 20,
							marginRight: -20
						}}
					>
						<div className="headerContainer">
							<text className="headerText">Stocks, Indices and Equities</text>
						</div>
						<div style={{ textAlign: 'left' }}>
							<ul>
								<li>Access to Futures</li>
								<li>Access to Stocks</li>
								<li>Access to Crypto</li>
							</ul>
						</div>
					</div>
				</div>
			</body>
		</div>
	);
}

export default App;
