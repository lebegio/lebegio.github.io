"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const entities_1 = require("./entities/entities");
dotenv_1.default.config();
const bot_1 = require("./bot");
const datasource_1 = require("./datasource");
(async () => {
    try {
        await datasource_1.AppDataSource.initialize();
        const pollRepository = datasource_1.AppDataSource.getRepository(entities_1.Poll);
        console.log("Connected to PostgreSQL");
    }
    catch (error) {
        console.log(error);
    }
})();
bot_1.bot.onText(/\/current/, async (msg) => {
    const pollRepository = datasource_1.AppDataSource.getRepository(entities_1.Poll);
    const poll = await pollRepository.findOne({
        where: {
            is_active: true
        }, relations: {
            poll_options: true
        }
    });
    bot_1.bot.sendMessage(msg.chat.id, `Current poll is ${poll?.name} with options: ${poll?.poll_options.map(x => x.name).join(';')}`);
});
bot_1.bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from?.id; // Access the user ID again
    bot_1.bot.sendMessage(chatId, `Received your message ${userId}!`);
    bot_1.bot.sendPoll(chatId, "Test poll tsts", ["abc", "cde", "ugb"], {
        is_anonymous: false,
        allows_multiple_answers: false,
    });
});
//# sourceMappingURL=main.js.map