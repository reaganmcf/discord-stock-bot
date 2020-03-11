FROM node:12.16

RUN mkdir /app && \
    groupadd app && \
    useradd -g app app && \
    chown app:app /app && \
    mkdir /home/app && \
    chown app:app /home/app

COPY --chown=app:app discord-stock-bot-page/ index.js package-lock.json package.json entrypoint.sh /app/
WORKDIR /app
USER app

RUN npm install
ENTRYPOINT ["/app/entrypoint.sh"]
