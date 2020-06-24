#!/bin/bash -eu

BOT_TOKEN="$BOT_TOKEN"
CHANNEL_ID="$CHANNEL_ID"

cat << EOF > /app/config.js
const config = {
	BOT_TOKEN: '$BOT_TOKEN',
	MORNING_BELL_CHANNEL_ID: '$CHANNEL_ID'
};

module.exports = config;
EOF

node index.js
