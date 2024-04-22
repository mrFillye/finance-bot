import { Context, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { config } from "dotenv";
import { CALLBACK_ACTION } from "./scenes/start";
import { scenes } from "./scenes";
import { APP_SCENES } from "./types";
import express from "express";
import { connnectRabbit } from "producer";

export const app = express();
export const stage = new Scenes.Stage<Scenes.SceneContext & Context>(scenes);

const main = async () => {
  config();

  const port = 8001;

  const bot = new Telegraf<Scenes.SceneContext & Context>(
    process.env.BOT_KEY as string
  );

  // await connnectRabbit();

  bot.use(session());
  bot.use(stage.middleware());

  bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
  });

  bot.command("start", (ctx) => {
    ctx.scene.enter(APP_SCENES.START);
  });

  bot.action(CALLBACK_ACTION.CREATE_CATEGORY, (ctx) => {
    ctx.scene.enter(APP_SCENES.CREATE_CATEGORY);
  });

  bot.action("start-scene", (ctx) => {
    ctx.reply("start-scene");

    ctx.scene.leave();
  });

  bot.launch();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main();
