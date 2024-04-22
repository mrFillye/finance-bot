import { Markup, Scenes } from "telegraf";
import { APP_SCENES } from "../../../types";
import { message } from "telegraf/filters";
import { connnectRabbit, produce } from "../../../producer";

interface ICategoryPayload {
  action: string;
  data: string;
}

const categoryCreate = new Scenes.BaseScene<Scenes.SceneContext>(
  APP_SCENES.CREATE_CATEGORY
);

categoryCreate.enter(async (ctx) => {
  ctx.reply(
    "Введите категорию",
    Markup.inlineKeyboard([
      Markup.button.callback("Посмотреть список категорий 📄", "view"),
      Markup.button.callback("На главную ⬅️", "start"),
    ])
  );
});

categoryCreate.on(message("text"), async (ctx) => {
  const { channel, connection } = await connnectRabbit();

  const message = ctx.message.text;

  if (!message) return;

  const payload = {
    action: "/create_category",
    data: message,
  };

  const sentMessage = await produce<ICategoryPayload>(
    APP_SCENES.CREATE_CATEGORY,
    channel,
    connection,
    payload
  );

  if (sentMessage) {
    ctx.reply(`Категория ${message} успешно добавлена ✅`);

    return;
  }

  ctx.reply("Что-то пошло не так ❌");

  ctx.scene.leave();

  ctx.scene.enter(APP_SCENES.CREATE_CATEGORY);
});

export default categoryCreate;
