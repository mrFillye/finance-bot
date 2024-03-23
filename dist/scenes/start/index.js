"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const types_1 = require("../../types");
const start = new telegraf_1.Scenes.BaseScene(types_1.APP_SCENES.START);
start.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply("Добро пожаловать в finance bot!", telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback("Начать пользоваться", "start-scene"),
    ]));
}));
exports.default = start;
//# sourceMappingURL=index.js.map