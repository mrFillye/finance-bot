import { Context, session, Telegraf } from "telegraf";
import { config } from "dotenv";

config();

const bot = new Telegraf<Context>(process.env.BOT_KEY as string);

bot.use(session());

bot.launch();

export default bot;
