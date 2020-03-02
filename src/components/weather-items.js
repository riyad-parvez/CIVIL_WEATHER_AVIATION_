import React, {Component} from 'react';

import WeatherItem from './weather-item';

class WeatherItems extends Component {
  render() {
    const weather = this.props.weatherData;
    if(!weather.loc || !weather.weather || !weather.weather.dep || !weather.weather.arr) {
      return (
        <div className="err-msg">
          <p>Enter Two City Name and Hit Enter or Click on Submit</p>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="curr-loc">
              <span>Current: </span>
              <h3>{weather.weather.dep.current.temp_c} <span className="c">C</span></h3>
              <p><span className="loc"><i className="fas fa-map-marker-alt"></i> {weather.loc.dep}</span></p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="curr-loc">
              <span>Current: </span>
              <h3>{weather.weather.arr.current.temp_c} <span className="c">C</span></h3>
              <p><span className="loc"><i className="fas fa-map-marker-alt"></i> {weather.loc.arr}</span></p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="list-info">
              Showing Weather Informations for Next 7 Days
            </div>
          </div>
          <div className="col-md-6">
            <ul className="list-group forecast">
              <WeatherItem items={weather.weather.dep.forecast.forecastday} />
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-group forecast">
              <WeatherItem items={weather.weather.arr.forecast.forecastday} />
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default WeatherItems;
