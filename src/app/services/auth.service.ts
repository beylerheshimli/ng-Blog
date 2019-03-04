import {Injectable} from '@angular/core';
import {AppConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable()
export class AuthService {


    constructor(private http: HttpClient,
                private config: AppConfig,
                private dataService: DataService) {

    }


    signin(data: any) {
        return this.http.post<any>(`${this.config.apiUrl}/signin.php`, data);
    }

    signup(data: any) {
        return this.http.post<any>(`${this.config.apiUrl}/signup.php`, data);
    }

    getUserData(token) {
        return this.http.post<any>(`${this.config.apiUrl}/getUser.php`, {token: token});
    }

    logout() {
        // localStorage.clear();
        localStorage.removeItem('token');
    }
}
