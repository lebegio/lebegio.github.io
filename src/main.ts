import dotenv from "dotenv";
import { Pool } from "pg";
import "reflect-metadata";
import { Poll, PollOption } from './entities/entities';

dotenv.config();

import { bot } from "./bot";
import {AppDataSource} from "./datasource"

(async () => {
  try {
    await AppDataSource.initialize();
    const pollRepository = AppDataSource.getRepository(Poll);

    
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.log(error);
  }
})();

bot.onText(/\/current/, async (msg)=> {
  const pollRepository = AppDataSource.getRepository(Poll);

  const poll = await pollRepository.findOne({
    where: {
    is_active: true
  }, relations: {
    poll_options: true
  }});

  bot.sendMessage(msg.chat.id, `Current poll is ${poll?.name} with options: ${poll?.poll_options.map(x=>x.name).join(';')}`);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id; // Access the user ID again
  bot.sendMessage(chatId, `Received your message ${userId}!`);
  bot.sendPoll(chatId, "Test poll tsts", ["abc", "cde", "ugb"], {
    is_anonymous: false,
    allows_multiple_answers: false,
  });
});
