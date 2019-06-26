import React from 'react';
import lighticon from './icons/lightining.svg';
import '../styles/Home.scss'
const Home=()=>{
    
    return (
        <div>
            <div className="header">
                <h2>Weather Forcast</h2>
                <img src={lighticon} alt='lightining icon' ></img>
            </div>

            <div className="instructions">
                <p>Enter a zipcode or partial address to get the current weather conditions for that area</p>  
            </div>

            <div className="addInput">
                <form method='POST' action='/search-location'>
                    <input type="text" placeholder='Zipcode/Address..' name='address'></input>
                    <button>Go!</button>
                </form>
            </div>
        </div>
    );
};

export default Home;