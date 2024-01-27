const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')
const { error } = require('console')

app.set('view engine','hbs')
const publicPath = (path.join(__dirname,'../public'))
const viewPath=(path.join(__dirname,'../template/views'))
const partialsPath=(path.join(__dirname,'../template/partials'))
app.use(express.static(publicPath))
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'An Error you should use ?address=example to search'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longtitude,location})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     location: 'Philadelphia',
    //     forecast: 'It is so hot',
    //     address:req.query.address
    // })
    
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Zx Studio',
        footer:'Up',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Help Page',
        footer:'Up'
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('',(req,res)=>{
    res.render('index',{
        title:'Index',
        footer:'Up'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errormessage:'Page Not Found',
        footer:'Up'
    })
})




app.listen(8080,()=>{
    console.log('Server is up on port 8080.')
})