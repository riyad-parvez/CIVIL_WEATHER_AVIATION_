import React from 'react';
import moment from 'moment';

const WeatherItem = ({items}) => {
  const data = items.map(item => {
    const dayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Thrusday', 'Wednesday', 'Friday', 'Saturday'];
    const date = moment(item.date);
    const dow = date.day();
    return (
      <li key={item.date} className="list-group-item">
        <p><span className="day-of-week">{dayOfTheWeek[dow]}</span> ({item.date})</p>
        <p><small>{item.day.condition.text}</small></p>
        <ul className="list-inline">
          <li className="list-inline-item"><small><i className="fas fa-sun"></i> {item.astro.sunrise}</small></li>
          <li className="list-inline-item"><small><i className="fas fa-moon"></i> {item.astro.sunset}</small></li>
        </ul>
        <div className="icon"><img src={`https:${item.day.condition.icon}`} alt="condition-icon" /></div>
          <ul className="list-inline">
            <li className="list-inline-item"><small><i className="fas fa-thermometer-empty"></i> {item.day.avgtemp_c}</small></li>
            <li className="list-inline-item"><small><i className="fas fa-fighter-jet"></i> {item.day.maxwind_kph}kph</small></li>
            <li className="list-inline-item"><small><i className="fas fa-tint"></i> {item.day.totalprecip_mm}mm</small></li>
          </ul>
      </li>
    )
  });
  return (
    <div>
      {data}
    </div>
  )
}

export default WeatherItem;
