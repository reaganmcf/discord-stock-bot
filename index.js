const Discord = require('discord.js');

const config = require('./config');

const client = new Discord.Client();
client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', (message) => {
	if (message.content == '$help') {
		let m =
			'fsb-ticker. Developed by BuffMan \n\n Example commands: \n `$avgo`\n `$aapl w`\n `$tsla d rsi macd`\n\n';
		message.channel.send(m);
	} else if (message.content.startsWith('$/')) {
		console.log('FUTURES');
		let ticker = message.content.split(' ')[0].substring(1);
		let rawOptions = message.content.split(ticker)[1].substring(1).split(' ');
		console.log(rawOptions);
		let options = [];
		for (var i = 0; i < rawOptions.length; i++) options.push(rawOptions[i]);
		//get time period
		let timePeriod = extractFromOptions('time_period_futures', options);
		console.log(options);
		console.log('timePeriod = ' + timePeriod);
		console.log('looking for ticker: ' + ticker);
		message.channel.send("My Bot's message", {
			files: [
				'https://elite.finviz.com/fut_chart.ashx?t=' +
					ticker +
					'&p=' +
					timePeriod +
					'&rev=' +
					config.FINVIZ_REV_KEY +
					'.png'
			]
		});
	} else if (message.content.startsWith('$')) {
		let ticker = message.content.split(' ')[0].substring(1);
		let rawOptions = message.content.split(ticker)[1].split(' ');
		let options = [];
		for (var i = 1; i < rawOptions.length; i++) options.push(rawOptions[i]);
		//get time period
		let timePeriod = extractFromOptions('time_period', options);
		let chartType = extractFromOptions('chart_type', options);
		let additionalIndicators = extractFromOptions('indicators', options);
		if (additionalIndicators.length != 0) timePeriod = 'd';
		console.log(options);
		//valid options = ta, time period, type

		console.log('looking for ticker: ' + ticker);
		message.channel.send("My Bot's message", {
			files: [
				'https://elite.finviz.com/chart.ashx?t=' +
					ticker +
					'&ty=' +
					chartType +
					(timePeriod == 'd' ? '&ta=st_c,sch_200p,sma_50,sma_200,sma_20' + additionalIndicators : '') +
					'&p=' +
					timePeriod +
					'&s=l&rev=' +
					config.FINVIZ_REV_KEY +
					'.png'
			]
		});
	}
});

function extractFromOptions(key, options) {
	if (key == 'indicators') {
		var tempIndicator = '';
		for (let i = 0; i < options.length; i++) {
			let item = options[i];
			switch (item) {
				case 'rsi':
					tempIndicator = ',' + 'rsi_b_14';
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
	}
}

client.login(config.BOT_TOKEN);
