const request = require("request");
const translate = require("./translate");
const parseString = require("xml2js").parseString;

const forecast = (lat , long ,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=cd88b468d1eeeffd9a5367134c724ac1&query=${encodeURI(lat)},${encodeURI(long)}&units=m`;

    request({url , json:true} , (error , {body})=>{
        const currentWeather = body.current;
        const ceviri="";
        

        if(error){
            callback("Unable to connect to forecast server" , undefined);
        }else if(body.error){
            callback({errType:body.error.type,errInfo:response.body.error.info} , undefined)
        }else{
            
            translate(currentWeather.weather_descriptions[0],(error,response)=>{
                if(error){
                    return console.log(error);
                }
                parseString(response, (err,result)=>{
                    ceviri =result.string._;
                });

                callback(undefined ,  `TR: Hava gün boyunca ${ceviri} olacak.\nHava şu an ${currentWeather.temperature} derece.\nHissedilen sıcaklık ${currentWeather.feelslike}\nNem ise şu an %${currentWeather.humidity} \n\nEN: It is ${currentWeather.weather_descriptions[0]} throughout the day.\nIt is currently ${currentWeather.temperature} degrees out.\nIt feels like ${currentWeather.feelslike} degrees out.\nHumidity is %${currentWeather.humidity} right now.`);
                
            
            });



            
        }

    });
}




module.exports = forecast;