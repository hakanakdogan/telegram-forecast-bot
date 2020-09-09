const TelegramBot = require("node-telegram-bot-api");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");



const token = "1374540809:AAHN11RT4z8cG5HyBLeoAuSf3M2vRWNLpIQ";

const bot = new TelegramBot(token, {polling:true});



bot.onText(/\/help/, (msg) => {
   const chatId = msg.chat.id;
   

    bot.sendMessage(chatId , 'You can get your weather by using the "/forecast"command.\nFor example "/forecast New York".');
});


bot.onText(/\/forecast (.+)/ , (msg,match)=>{
    const chatId = msg.chat.id;
    const response = match[1];
    geocode(response , (error ,{latitude, longitude, text}={})=>{
        if(error !== undefined){
            return bot.sendMessage(chatId,error);
        }else{
            forecast(latitude, longitude, (error,response)=>{
                if(error !== undefined){
                    return res.send({
                        error
                    });
                }else{
                    bot.sendMessage(chatId, `Location: ${text}`);
                    bot.sendMessage(chatId, `${response}`);
                    
                }
               
               
                
            });
        }
    });


    
});

