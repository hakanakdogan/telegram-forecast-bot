const TelegramBot = require("node-telegram-bot-api");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");



const token = "1374540809:AAHN11RT4z8cG5HyBLeoAuSf3M2vRWNLpIQ";

const bot = new TelegramBot(token, {polling:true});



bot.onText(/\/yardim/, (msg) => {
   const chatId = msg.chat.id;
   

    bot.sendMessage(chatId , 'TR: Hava durumunuzu "/havadurumu" kodunu kullanarak görüntüleyebilirsiniz.\nOrnegin:"/havadurumu New York"\nEN: You can get your weather by using the "/havadurumu"command.\nFor example "/havadurumu New York".');
});


bot.onText(/\/havadurumu (.+)/ , (msg,match)=>{
    const chatId = msg.chat.id;
    const response = match[1];
    geocode(response , (error ,{latitude, longitude, text}={})=>{
        if(error !== undefined){
            return bot.sendMessage(chatId,error);
        }else{
            forecast(latitude, longitude, (error,response)=>{
                if(error !== undefined){
                    return bot.sendMessage(chatId,{
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

