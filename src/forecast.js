const request = require('request')
const forecast = (latitude,longtitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a9b6f6e187739c5e3d1b14f925a3ba1d&query='+ latitude  + ',' +longtitude +'&units=f'
    request({url:url,json:true},(error,{body})=>{
        if (error) {
            callback('Error undefined', undefined);
        } else if (body.error) {
            callback('Not found', undefined);
        } else {
            callback(undefined,body.current.temperature + ' C. and chance to raining is ' + body.current.weather_descriptions[0])
        }
    })
}

module.exports=forecast