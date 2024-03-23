"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stage = void 0;
const telegraf_1 = require("telegraf");
const dotenv_1 = require("dotenv");
const start_1 = __importDefault(require("./scenes/start"));
const types_1 = require("./types");
(0, dotenv_1.config)();
const bot = new telegraf_1.Telegraf(process.env.BOT_KEY);
exports.stage = new telegraf_1.Scenes.Stage([start_1.default]);
bot.use((0, telegraf_1.session)());
bot.use(exports.stage.middleware());
bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});
bot.command("start", (ctx) => {
    ctx.scene.enter(types_1.APP_SCENES.START);
});
bot.action("start-scene", (ctx) => {
    ctx.reply("start-scene");
    ctx.scene.leave();
});
bot.launch();
exports.default = bot;
//# sourceMappingURL=index.js.map