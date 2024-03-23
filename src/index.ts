import { Context, Scenes, session, Telegraf } from "telegraf";
import { config } from "dotenv";
import start from "./scenes/start";
import { APP_SCENES } from "./types";

config();

const bot = new Telegraf<Scenes.SceneContext & Context>(
  process.env.BOT_KEY as string
);
export const stage = new Scenes.Stage<Scenes.SceneContext & Context>([start]);

bot.use(session());
bot.use(stage.middleware());

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.command("start", (ctx) => {
  ctx.scene.enter(APP_SCENES.START);
});

bot.action("start-scene", (ctx) => {
  ctx.reply("start-scene");

  ctx.scene.leave();
});

bot.launch();

export default bot;
