const request = require("request");
const translate =(forecast,callback)=>{
    

    var options = {
        method: 'GET',
        url: 'https://microsoft-azure-translation-v1.p.rapidapi.com/translate',
        qs: {from: 'en', to: 'tr', text: forecast},
        headers: {
          'x-rapidapi-host': 'microsoft-azure-translation-v1.p.rapidapi.com',
          'x-rapidapi-key': '7e4c8a728emshe997bc7b04c32ffp10de0ejsn5ea99e0373c7',
          accept: 'application/json',
          useQueryString: true
        }
      };
      
      request(options, function (error, response, body) {
        if (error){
            callback(error,undefined);
        }
    
        callback(undefined , body);
      });


}



module.exports = translate;