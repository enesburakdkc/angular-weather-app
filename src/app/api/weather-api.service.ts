import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  apiKey:string = "8356c524ea67e32509696b5d9a4e1b2e";
  apiUrl:string = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&appid="+this.apiKey;

  constructor(private http:HttpClient) { }

  getCurrentWeather(lat:string, lon:string): Observable<any>{
    return this.http.get(this.apiUrl+"&lat="+lat+"&lon="+lon);
  }

  getNextTimesWeather(lat:string, lon:string): Observable<any>{
    let uri = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=tr&appid="+this.apiKey+"&lat="+lat+"&lon="+lon;
    return this.http.get(uri);
  }
}
