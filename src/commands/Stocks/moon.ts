import sharp from 'sharp';
import got from 'got';
import fs from 'fs';
import { Message } from 'discord.js';

export const drawMoon = (imgUrl: string, msg: Message): void => {
  const sharpStream = sharp({
    failOnError: false,
  });

  const promises = [];

  promises.push(
    sharpStream
      .clone()
      .composite([{ input: 'moon_day.png', gravity: 'southeast' }])
      .toFile('moonPhase.png'),
  );

  got.stream(imgUrl).pipe(sharpStream);

  Promise.all(promises)
    .then(() => {
      msg.channel
        .send(
          {
            files: ['moonPhase.png'],
          },
        ).then(() => fs.unlinkSync('originalFile.jpg'));
    })
    .catch((err) => {
      console.error("Error processing files, let's clean it up", err);
      fs.unlinkSync('originalFile.jpg');
    });
};
