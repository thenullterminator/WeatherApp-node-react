import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../styles/CurrentWeather.scss';

// Importing icons.
import ThunderStormIcon from './icons/weather-icons/w1.svg';
import RainIcon from './icons/weather-icons/w2.svg';
import SnowIcon from './icons/weather-icons/w3.svg';
import ClearIcon from './icons/weather-icons/w4(day).svg';
import CloudsIcon from './icons/weather-icons/w5.svg';
import NoLocationFound from './icons/no-location.svg';
import LoadingIcon from './icons/loading.svg';

class CurrentWeather extends React.Component{

    //  Setting up component state.
    state=({
        isLoading:true,
        currentTemp:'',
        humidity:'',
        wind:'',
        windDirection:'',
        currentCondition:'',
        currentConditionDescription:'',
        weatherIcon:'',
        cityName:'',
        cityNotFound:''
    });

    componentDidMount(){

        axios({
            method:'GET',
            url:'/search-location-weather'
        }).then((response)=>{

            if(response.data.cod==='404'){
                this.setState({
                    isLoading:false,
                    cityNotFound:'404'
                });
            }
            else{

                let weatherId=response.data.weather[0].id;
                if(weatherId <= 232) {
			        this.setState({ weatherIcon: ThunderStormIcon })
			    } else if(weatherId >= 300 && weatherId <= 531) {
			        this.setState({ weatherIcon: RainIcon });
			    } else if(weatherId >= 600 && weatherId <= 622 ) {
			        this.setState({ weatherIcon: SnowIcon });
			    } else if(weatherId === 800) {
			        this.setState({ weatherIcon: ClearIcon });
			    } else if(weatherId >= 801 && weatherId <= 804) {
			        this.setState({ weatherIcon: CloudsIcon });
                }
                
                this.setState({
			        isLoading: false,
			        currentTemp: Math.round(response.data.main.temp-273) + '°c',
			        humidity: response.data.main.humidity + '%',
			        wind: Math.round(response.data.wind.speed) + ' mph',
			        windDirection: response.data.wind.deg,
			        currentCondition: response.data.weather[0].main,
			        currentConditionDescription: response.data.weather[0].description,
			        cityName: response.data.name
			     });
            }
        }).catch(e => console.log(e));

    }

    render(){
        const WeatherCardError=(
            <div className='weatherCardContainer'>
                <div className='weatherCardError'>
                    <img src={NoLocationFound} alt='No location found' />
                    <p>Whoa! Looks like there was an error with your address.</p>
                    <Link to='/'><button>Try Again</button></Link>
                </div>
            </div>
        );
        
        const WeatherConditions=(
            
            this.state.cityNotFound==='404'? (<div>{WeatherCardError}</div>):
            (
                <div>
                    <div className='homeBtn'>
                        <Link to='/'><button>Home</button></Link>
                    </div>
                    <div className='weatherCardContainer'>
                        <div className='weatherCard'>
                            <img src={this.state.weatherIcon} alt='weather icon'/>
                            <div className='conditionsOverview'>
                                <p>{this.state.currentTemp}</p>
                                <p>{this.state.currentConditionDescription}</p>
                            </div>
                            <div className='conditionDetails'>
                                <p>Humidity:{this.state.humidity}</p>
                                <p>Wind Speed:{this.state.wind}</p>
                            </div>
                        </div>
                        <h4>Location | {this.state.cityName}</h4>
                    </div>
                </div>
            )
        );

        const LoadingDisplay=(
            <div className='loading'>
                <img className='loadingIcon' src={LoadingIcon} alt='loading icon' />
            </div>
        );

        const CurrentWeatherCard = ( 
            this.state.isLoading === true ? <div> {LoadingDisplay} </div> : <div> {WeatherConditions} </div>
        );
 
        return (
        <div>
                { CurrentWeatherCard }
        </div>
        );
    }

}

export default CurrentWeather;