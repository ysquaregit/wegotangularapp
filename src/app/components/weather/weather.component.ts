import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    cityName = 'Bangalore';
    maxTemp;
    Humidity;
    CurTemp;
    place;
    weather;
    weatherdesc;
    private ticks = 0;
    private fetchedHtml;
    private minTemp;

    constructor(private http: Http) {
        this.searchCity();
    }


    searchCity() {
        this.http.get('https://api.openweathermap.org/data/2.5/weather?APPID=0ba5e82df49a15a79cec569618c56215&units=metric&&q=' + this.cityName)
            .subscribe(
                (res: Response) => {
                    const weatherCity = res.json();
                    //console.log(weatherCity);
                    this.minTemp = weatherCity.main.temp_min;
                    this.maxTemp = weatherCity.main.temp_max;
                    this.Humidity = weatherCity.main.humidity;
                    this.CurTemp = weatherCity.main.temp;
                    this.place = weatherCity.main.name;
                    this.weather = weatherCity.weather[0].main;
                    this.weatherdesc = weatherCity.weather[0].description;
                })
    }

    ngOnInit() {

        let timer = Observable.timer(5100, (1000 * 60));
        timer.subscribe(t => {
            this.ticks = this.ticks + 1;
            // console.log(this.ticks);
            if (this.ticks === 5) {
                this.searchCity();
                this.ticks = 0;
            }
        });
    }

}

