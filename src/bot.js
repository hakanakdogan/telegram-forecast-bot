const TelegramBot = require("node-telegram-bot-api");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const translate = require("./utils/translate");
const parseString = require("xml2js").parseString;

const token = "1374540809:AAHN11RT4z8cG5HyBLeoAuSf3M2vRWNLpIQ";

const bot = new TelegramBot(token, {polling:true});

bot.onText(/\/start/ , (msg)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId , 'TR: Hava durumunuzu "/havadurumu" kodunu kullanarak görüntüleyebilirsiniz.\nOrnegin:"/havadurumu New York"\n\nEN: You can get your weather by using the "/havadurumu"command.\nFor example "/havadurumu New York".');
});


bot.onText(/\/yardim/, (msg) => {
   const chatId = msg.chat.id;
   

    bot.sendMessage(chatId , 'TR: Hava durumunuzu "/havadurumu" kodunu kullanarak görüntüleyebilirsiniz.\nOrnegin:"/havadurumu New York"\n\nEN: You can get your weather by using the "/havadurumu"command.\nFor example "/havadurumu New York".');
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
                    translate(response.weather,(error,data)=>{
                        if(error){
                            return console.log(error);
                        }else{
                            parseString(data, (err,result)=>{
                                
                                bot.sendMessage(chatId, `TR: Mekan: ${text}\nEN: Location: ${text}\n\nTR: Hava gün boyunca ${result.string._} olacak.\nŞu an sıcaklık ${response.temperature} derece.\nHissedilen sıcaklık ise ${response.feelslike}derece.\nNem yüzdesi ise %${response.humidity}\n\nEN: It is ${response.weather} throughout the day.\nIt is currently ${response.temperature} degrees out.\nIt feels like ${response.feelslike} degrees out.\nHumidity is %${response.humidity} right now.`);
                            })
                            
                        }
                        
                        
                    
                    })
                    
                    
                    
                    
                }
               
               
                
            });
        }
    });


    
});

