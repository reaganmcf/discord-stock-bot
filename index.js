const Discord = require('discord.js');
const moment = require('moment');
const config = require('./config');
const client = new Discord.Client();
client.on('ready', () => {
	console.log('I am ready! Current time is ' + moment().format('LT'));
	let weekday = moment().isoWeekday();
	let sentMessage = false;
	setInterval(() => {
		if (moment().format('LT') == '1:30 AM' && !sentMessage && weekday < 6) {
			console.log('MARKET HAS OPENED');
			sentMessage = true;
			client.channels.get(config.MORNING_BELL_CHANNEL_ID).send('**MARKET IS OPEN**\n\t:bell::bell::bell:\t');
		} else if (moment().format('LT') == '1:31 AM') {
			sentMessage = false;
		}
	}, 1000);
});

client.on('message', (message) => {
	if (message.content == '$help') {
		let m =
			'fsb-ticker. Developed by BuffMan \n\n Example commands: \n `$avgo`\n `$aapl w`\n `$tsla d rsi macd`\n `$spy line`\n `$/es`\n `$.btc`\n `$usd/jpy w`\n `$sectors ytd`\n\n' +
			'**Currently Scheduled Features**\n' +
			'- Add support for BollingerBands and other Overlays\n\n' +
			'_Contact BuffMan for more info and any feature requests_\n';
		message.channel.send(m);
	} else if (message.content.startsWith('$.')) {
		console.log('CRYPTO');
		let ticker = message.content.split(' ')[0].substring(2);
		let rawOptions = message.content.split(ticker)[1].substring(1).split(' ');
		let options = [];
		for (var i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
		let timePeriod = extractFromOptions('time_period_forex', options);
		console.log('https://elite.finviz.com/fx_image.ashx?' + ticker + 'usd_' + timePeriod + '_l.png');
		if (checkTicker(ticker, 'crypto')) {
			message.channel.send('', {
				files: [ 'https://elite.finviz.com/fx_image.ashx?' + ticker + 'usd_' + timePeriod + '_l.png' ]
			});
		}
	} else if (message.content.includes('/') && message.content.indexOf('/') != 1) {
		console.log('FOREX');
		let ticker = message.content.split(' ')[0].substring(1);
		let rawOptions = message.content.split(ticker)[1].substring(1).split(' ');
		let options = [];
		for (var i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
		let timePeriod = extractFromOptions('time_period_forex', options);
		if (checkTicker(ticker, 'forex')) {
			message.channel.send('', {
				files: [
					'https://elite.finviz.com/fx_image.ashx?' + ticker.split('/').join('') + '_' + timePeriod + '_l.png'
				]
			});
		}
	} else if (message.content.startsWith('$sectors')) {
		console.log('SECTORS');
		let rawOptions = message.content.split(' ');
		let rawTimePeriod = 'day';
		if (rawOptions.length > 1) {
			rawTimePeriod = rawOptions[1];
		}
		let formattedTimePeriod = extractFromOptions('time_period_sector', rawTimePeriod);

		message.channel.send('', {
			files: [ 'https://elite.finviz.com/grp_image.ashx?bar_sector_' + formattedTimePeriod + '.png' ]
		});
	} else if (message.content.startsWith('$/')) {
		console.log('FUTURES');
		let ticker = message.content.split(' ')[0].substring(1);
		let rawOptions = message.content.split(ticker)[1].substring(1).split(' ');
		console.log(rawOptions);
		let options = [];
		for (var i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
		//get time period
		let timePeriod = extractFromOptions('time_period_futures', options);
		console.log(`timePeriod: ${timePeriod}`);
		if (checkTicker(ticker)) {
			message.channel.send('', {
				files: [ 'https://elite.finviz.com/fut_chart.ashx?t=' + ticker + '&p=' + timePeriod + '&f=1.png' ]
			});
		}
	} else if (message.content.startsWith('$')) {
		let ticker = message.content.split(' ')[0].substring(1);
		let rawOptions = message.content.split(ticker)[1].split(' ');
		let options = [];
		for (var i = 1; i < rawOptions.length; i++) options.push(rawOptions[i]);
		let timePeriod = extractFromOptions('time_period', options);
		let chartType = extractFromOptions('chart_type', options);
		let additionalIndicators = extractFromOptions('indicators', options);
		if (additionalIndicators.length != 0) timePeriod = 'd';
		// console.log(
		// 	'https://elite.finviz.com/chart.ashx?t=' +
		// 		ticker +
		// 		'&ty=' +
		// 		chartType +
		// 		(timePeriod == 'd' ? '&ta=st_c,sch_200p' + additionalIndicators : '') +
		// 		'&p=' +
		// 		timePeriod +
		// 		'&s=l' +
		// 		'.png'
		// );
		if (checkTicker(ticker)) {
			message.channel.send('', {
				files: [
					'https://elite.finviz.com/chart.ashx?t=' +
						ticker +
						'&ty=' +
						chartType +
						(timePeriod == 'd' ? '&ta=st_c,sch_200p' + additionalIndicators : '') +
						'&p=' +
						timePeriod +
						'&s=l' +
						'.png'
				]
			});
		}
	}
});

function checkTicker(ticker, type_check = null) {
	if (type_check != null) {
		if (type_check == 'forex') {
			return /^(eur\/usd|gbp\/usd|usd\/jpy|usd\/cad|usd\/chf|aud\/usd|nzd\/usd|eur\/gbp|gbp\/jpy)/g.test(ticker);
		} else if (type_check == 'crypto') {
			return /^(btc|ltc|eth|xrp|bch)/g.test(ticker);
		}
	}
	return !/.*\d+.*/g.test(ticker);
}

const urlExists = (url) =>
	new Promise((resolve, reject) =>
		request.head(url).on('response', (res) => resolve(res.statusCode.toString()[0] === '2'))
	);

function extractFromOptions(key, options) {
	if (key == 'indicators') {
		var tempIndicator = '';
		if (
			!options.includes('bb20') &&
			!options.includes('bb50') &&
			!options.includes('borc') &&
			!options.includes('ema')
		) {
			tempIndicator += ',sma_50,sma_200,sma_20';
		}
		for (let i = 0; i < options.length; i++) {
			let item = options[i];
			switch (item) {
				case 'rsi':
					tempIndicator += ',' + 'rsi_b_14';
					break;
				case 'macd':
					tempIndicator += ',' + 'macd_b_12_26_9';
					break;
				case 'adx':
					tempIndicator += ',' + 'adx_b_14';
					break;
				case 'atr':
					tempIndicator += ',' + 'atr_b_14';
					break;
				case 'cci':
					tempIndicator += ',' + 'cci_b_20';
					break;
				case 'fi':
					tempIndicator += ',' + 'fi_b_14';
					break;
				case 'mfi':
					tempIndicator += ',' + 'mfi_b_14';
					break;
				case 'ppi':
					tempIndicator += ',' + 'perf_b_SPY_QQQ';
					break;
				case 'rwi':
					tempIndicator += ',' + 'rwi_b_9';
					break;
				case 'roc':
					tempIndicator += ',' + 'roc_b_12';
					break;
				case 'rmi':
					tempIndicator += ',' + 'rmi_b_20';
					break;
				case 'stofu':
					tempIndicator += ',' + 'stofu_b_14_3_3';
					break;
				case 'stosl':
					tempIndicator += ',' + 'stosl_b_14_3';
					break;
				case 'stofa':
					tempIndicator += ',' + 'stofa_b_14_3';
					break;
				case 'trix':
					tempIndicator += ',' + 'trix_b_9';
					break;
				case 'ult':
					tempIndicator += ',' + 'ult_b_7_14_28';
					break;
				case 'wr':
					tempIndicator += ',' + 'wr_b_14';
					break;
				case 'bb20':
					tempIndicator += ',' + 'bb_20_2';
					break;
				case 'bb50':
					tempIndicator += ',' + 'bb_50_2';
					break;
				case 'borc':
					tempIndicator += ',' + 'bb_20_2,bb_50_2';
					break;
				case 'hilo':
					tempIndicator += ',' + 'hilo_20';
					break;
				case 'ema':
					tempIndicator += ',' + 'ema_9,ema_21';
					break;
			}
		}
		return tempIndicator;
	} else if (key == 'chart_type') {
		var tempChartType = 'c';
		for (let i = 0; i < options.length; i++) {
			let item = options[i];
			switch (item) {
				case 'line':
					tempChartType = 'l';
					break;
			}
		}
		return tempChartType;
	} else if (key == 'time_period') {
		var tempTimePeriod = 'i5';
		for (let i = 0; i < options.length; i++) {
			let item = options[i];
			switch (item) {
				case 'm':
					tempTimePeriod = 'm';
					break;
				case 'w':
					tempTimePeriod = 'w';
					break;
				case 'd':
					tempTimePeriod = 'd';
					break;
				case '15':
					tempTimePeriod = 'i15';
					break;
				case '3':
					tempTimePeriod = 'i3';
					break;
			}
		}
		return tempTimePeriod;
	} else if (key == 'time_period_futures') {
		var tempTimePeriod = 'm5';
		for (let i = 0; i < options.length; i++) {
			let item = options[i];
			switch (item) {
				case 'h':
					tempTimePeriod = 'h1';
					break;
				case 'd':
					tempTimePeriod = 'd1';
					break;
				case 'w':
					tempTimePeriod = 'w1';
					break;
				case 'm':
					tempTimePeriod = 'm1';
					break;
			}
		}
		return tempTimePeriod;
	} else if (key == 'time_period_forex') {
		var tempTimePeriod = 'm5';
		for (let i = 0; i < options.length; i++) {
			let item = options[i];
			switch (item) {
				case 'h':
					tempTimePeriod = 'h1';
					break;
				case 'd':
					tempTimePeriod = 'd1';
					break;
				case 'w':
					tempTimePeriod = 'w1';
					break;
				case 'm':
					tempTimePeriod = 'mo';
					break;
			}
		}
		return tempTimePeriod;
	} else if (key == 'time_period_sector') {
		tempTimePeriod = 't';
		switch (options) {
			case 'w':
				tempTimePeriod = 'w';
				break;
			case 'm':
				tempTimePeriod = 'm';
				break;
			case 'q':
				tempTimePeriod = 'q';
				break;
			case 'h':
				tempTimePeriod = 'h';
				break;
			case 'y':
				tempTimePeriod = 'y';
				break;
			case 'ytd':
				tempTimePeriod = 'ytd';
				break;
		}
		return tempTimePeriod;
	}
}

client.login(config.BOT_TOKEN);
