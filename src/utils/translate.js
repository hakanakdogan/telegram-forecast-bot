const request = require("request");
const translate =(forecast,callback)=>{
    

    const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    qs: {profanityAction: 'NoAction', textType: 'plain', to: 'tr', 'api-version': '3.0'},
    headers: {
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
        'x-rapidapi-key': '7e4c8a728emshe997bc7b04c32ffp10de0ejsn5ea99e0373c7',
        'content-type': 'application/json',
         accept: 'application/json',
        useQueryString: true
    },
    body: [{Text: forecast}],
    json: true
};

request(options, (error, response, body)=> {
	if (error){
        callback(error,undefined);
    }

	callback(undefined , body);
});
}



module.exports = translate;