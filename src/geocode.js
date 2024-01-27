const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address +'.json?access_token=pk.eyJ1IjoidXBrdW5namEiLCJhIjoiY2xxZGt2Z2JxMDRteDJsdDZjanlnMzBqYyJ9.gZ66GivYquUDVsOHFLjE0A&limit=1'
    request({url:url ,json:true},(error,{body}) => {

        if(error){
            callback('Error Undefined',undefined)
        }else if (!body.features ||body.features.length === 0) {
            callback('No No No Search again',undefined)
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude : body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
        
    })

}
module.exports = geocode