import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(private http: HttpClient, private config: AppConfig) {
    }

    getForecast() {
        return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=Baku&units=metric&appid=86632396ee2d7bb631fdc4236a7d84d1`).pipe(map((res: any) =>
            res = this.mapValue(res)
        ));
    }

    private mapValue(data): any {
        if (data) {
            return {
                successful: true,
                name: data.name,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            };
        } else {
            return {
                successful: false
            };
        }
    }

}
