const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start((ctx) => ctx.reply('Hello, I\'m a bot, send me your location and get the weather forecast'));
bot.help((ctx) => ctx.reply('Send me bot sticker'))
bot.on(message('animation'), (ctx) => ctx.reply('👍 Cool animation, let\'s do more'))
bot.hears(['Hi', 'hi', 'hello', 'Hello', 'hey', 'Hey'], (ctx) => ctx.reply('Hey there'));
bot.on(message, async (ctx) =>{
    if(ctx.message.location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${process.env.OPEN_WEATHER_API_TOKEN}`;
        const response = await axios.get(url);
        const kelvinTemperature = response.data.main.temp;
        const celsiusTemperature = kelvinTemperature - 273.15;
        ctx.reply(`${response.data.name}: ${celsiusTemperature.toFixed(2)}°C`);
    }
});

bot.launch();