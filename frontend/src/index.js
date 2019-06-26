import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Home from './Pages/HomePage';
import CurrentWeather from './Pages/CurrentWeather';


ReactDOM.render(
    <Router>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/error' component={Home}></Route>
        <Route exact path='/current-weather' component={CurrentWeather}></Route>
    </Router>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
