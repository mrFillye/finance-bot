import { Context, Markup, Scenes } from "telegraf";
import bot from "../../app";
import { APP_SCENES } from "../../types";

const start = new Scenes.BaseScene<Scenes.SceneContext>(APP_SCENES.START);

start.enter(async (ctx: Scenes.SceneContext) => {
  ctx.reply(
    "Добро пожаловать в finance bot!",

    Markup.inlineKeyboard([
      Markup.button.callback("Начать пользоваться", "start-scene"),
    ])
  );
});

export default start;
