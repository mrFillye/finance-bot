import { Markup, Scenes } from "telegraf";
import { APP_SCENES } from "../../types";

export enum CALLBACK_ACTION {
  CREATE_CATEGORY = "create_category",
  CREATE_SPENDING = "create_spending",
  CREATE_INCOME = "create_income",
  VIEW_INCOME = "view_income",
}

const start = new Scenes.BaseScene<Scenes.SceneContext>(APP_SCENES.START);

start.enter(async (ctx: Scenes.SceneContext) => {
  ctx.reply(
    "Выберите действие!",

    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "Создать категорию",
          CALLBACK_ACTION.CREATE_CATEGORY
        ),
        Markup.button.callback(
          "Добавить трату",
          CALLBACK_ACTION.CREATE_SPENDING
        ),
      ],
      [
        Markup.button.callback("Список категорий", "start-scene"),
        Markup.button.callback("Список трат", "start-scene"),
      ],
      [
        Markup.button.callback("Добавить доход", "start-scene"),
        Markup.button.callback("Посмотреть доходы", "start-scene"),
      ],
    ])
  );
});

export default start;
