require('./config/config');//Importing some basic configurations for server.

// Importing third party utilites.
const cors=require('cors');
const _=require('lodash');
const axios=require('axios');
const express=require('express');
const bodyparser=require('body-parser');

const app=express(); // Creating a new application.

// Setting middlewares.
app.use(bodyparser.urlencoded({ extended: false }))//parse data from the encoded url(in this case for handling post request due to form submission)from the request received and makes it accessible through req.body.
app.use(bodyparser.json());//parse json data from the request received and makes it accessible through req.body.
// parsing is required since it is not readable by default.

var corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
  }
app.use(cors(corsOptions));// Only allowing frontend domain for cross-origin-resource-sharing.
//app.use(cors()) allows all the domains for resource sharing.

placeInfo={};//To store usefull information about the address and sharing this info with all routes.

// Setting up route to recieve address and converting it into geocoded values.
app.post('/search-location',(req,res)=>{
    
    let address=req.body.address;//accessing the address sent along in the body.
    // Calling API for geocoding of the above address.
    axios({
        method:'get',
        url:`https://nominatim.openstreetmap.org/search/${encodeURIComponent(address)}?format=json&email=${process.env.GEOCODE_SECRET}&addressdetails=1&limit=1`
    }).then((response)=>{

        if(response.data.length===0)
        {
            placeInfo={
                cod:'404'
            }
            res.redirect('/current-weather');
            return ;
        }
       
       placeInfo=_.pick(response.data[0],['place_id','lat','lon','display_name']);//Assigning usefull information regarding the address.       
    //    res.send(placeInfo);//sending back the required information about the address.
       res.redirect('/current-weather');
    }).catch((e)=>{
        res.redirect('/error');
    });
});

//Setting up route for making weather api call for found latitude and longitude.
app.get('/search-location-weather',(req,res)=>{

    if('cod' in placeInfo)
    {
        res.send(placeInfo);
        return ;
    }
    axios({
        method:'get',
        url:`http://api.openweathermap.org/data/2.5/weather?lat=${placeInfo.lat}&lon=${placeInfo.lon}&APPID=${process.env.WEATHER_SECRET}`
    }).then((response)=>{
        res.status(200).send(response.data);
    }).catch((e)=>{
        res.redirect('/error');
    });
});

// Setting up port for listening.
app.listen(process.env.PORT,(err)=>{
    if(err)
    {
        console.log(err);
    }
    console.log(`Server is up at port ${process.env.PORT}`);
});