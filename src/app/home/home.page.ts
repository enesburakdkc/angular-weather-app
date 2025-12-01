import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../api/weather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fetchData: any;
  fetchNextTimesData: any;
  weather_main: string = "";
  weather_description: string = "";
  weather_icon: string = "";
  main_temp: number = 0;
  main_feels_like: number = 0;
  main_temp_min: number = 0;
  main_temp_max: number = 0;
  main_humidity: number = 0;
  wind_speed: number = 0;
  sys_country: string = "";
  sys_sunrise: number = 0;
  sys_sunset: number = 0;
  name: string = "";

  lat: string = "40.995089";
  lon: string = "28.911272";

  constructor(private weather: WeatherApiService) {}

  getCurrentWeather() {
    this.weather.getCurrentWeather(this.lat, this.lon).subscribe(
      (data) => {
        console.log('Weather data received:', data);
        this.fetchData = data;
        this.weather_main = this.fetchData.weather[0].main;
        this.weather_description = this.fetchData.weather[0].description;
        this.weather_icon = this.fetchData.weather[0].icon;
        this.main_temp = this.fetchData.main.temp;
        this.main_feels_like = this.fetchData.main.feels_like;
        this.main_temp_min = this.fetchData.main.temp_min;
        this.main_temp_max = this.fetchData.main.temp_max;
        this.main_humidity = this.fetchData.main.humidity;
        this.wind_speed = this.fetchData.wind.speed;
        this.sys_country = this.fetchData.sys.country;
        this.sys_sunrise = this.fetchData.sys.sunrise;
        this.sys_sunset = this.fetchData.sys.sunset;
        this.name = this.fetchData.name;
        console.log('Weather data processed:', {
          main: this.weather_main,
          temp: this.main_temp,
          location: this.name
        });
      },
      (error) => {
        console.error('Error fetching current weather:', error);
      }
    )
  }

  getNextTimesWeather() {
    console.log('Fetching forecast...');
    this.weather.getNextTimesWeather(this.lat, this.lon).subscribe(
      (data) => {
        console.log('Forecast data received:', data);
        this.fetchNextTimesData = data;
      },
      (error) => {
        console.error('Error fetching forecast:', error);
      }
    )
  }

  // Converts Unix timestamp from the API to a human-readable time value
  convertUnixTimeToDateTime(unixTime: number): string {
    // Convert Unix timestamp to milliseconds (JavaScript Date object uses milliseconds)
    const date = new Date(unixTime * 1000);

    // Return date and time in a readable format
    return date.toLocaleString(); // This method returns date and time in the local time zone.
  }

  ngOnInit(): void {
    console.log("ngOnInit is working!");
    this.getCurrentWeather();
    this.getNextTimesWeather();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}