import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Search from './components/search';
import WeatherItems from './components/weather-items';

const API_KEY_APIXU = `2604b332159f43759c625614181803`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loc: null,
      weather: {
        dep: null,
        arr: null
      }
    }
    this.formDataHandler = this.formDataHandler.bind(this);
  }

  getLocationData({dep, arr}) {
    const locs = {
      dep: {},
      arr: {}
    };

    const getCorDep = () => {
      const reURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${dep}&key=AIzaSyCAMPW2wJFcxjRzmJ47FKdXUfS2o4KgOWU`;
      return axios.get(reURL);
    }

    const getCorArr = () => {
      const reURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${arr}&key=AIzaSyCAMPW2wJFcxjRzmJ47FKdXUfS2o4KgOWU`;
      return axios.get(reURL);
    }

    axios.all([getCorDep(), getCorArr()])
      .then(axios.spread((dep, arr) => {
        locs.dep.addr = dep.data.results[0].formatted_address;
        locs.dep.lat = dep.data.results[0].geometry.location.lat;
        locs.dep.long = dep.data.results[0].geometry.location.lng;
        locs.arr.addr = arr.data.results[0].formatted_address;
        locs.arr.lat = arr.data.results[0].geometry.location.lat;
        locs.arr.long = arr.data.results[0].geometry.location.lng;
        this.getWeatherData(locs);
        const loc = {
          dep: dep.data.results[0].formatted_address,
          arr: arr.data.results[0].formatted_address
        }
        this.setState({loc});
      }));
  }

  getWeatherData({dep, arr}) {
    const weatherData = {
      depWea: {},
      arrWea: {}
    }

    const getWeaDep = () => {
      const reURL = `https://api.apixu.com/v1/forecast.json?key=${API_KEY_APIXU}&q=${dep.lat},${dep.long}&days=100`;
      return axios.get(reURL);
    }

    const getWeaArr = () => {
      const reURL = `https://api.apixu.com/v1/forecast.json?key=${API_KEY_APIXU}&q=${arr.lat},${arr.long}&days=100`;
      return axios.get(reURL);
    }
    axios.all([getWeaDep(), getWeaArr()])
      .then(axios.spread((dep, arr) => {
        weatherData.depWea = dep.data;
        weatherData.arrWea = arr.data;
        const weather = {
          dep: weatherData.depWea,
          arr: weatherData.arrWea
        }
        this.setState({weather});
      }));
  }

  formDataHandler(loc) {
    this.setState({loc}, () => {
      this.getLocationData(this.state.loc);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="search-bar-area">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <div className="intro">
                  <h1>Civil Weather Aviation</h1>
                  <p>The Aviation Weather Center delivers consistent, timely and accurate weather information for the world airspace system. We are a team of highly skilled people dedicated to working with customers and partners to enhance safe and efficient flight.</p>
                </div>
                <div className="search-bar">
                  <Search formDataHandler={this.formDataHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-item-area">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <WeatherItems weatherData={this.state} />
              </div>
            </div>
          </div>
        </div>
        <footer className="footer-area">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <ul className="made-by list-inline">
                  <li className="list-inline-item">Riyad Parvez</li>
                  <li className="list-inline-item">Ashotosh Saraf</li>
                  <li className="list-inline-item">Krishna Shrivas</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
