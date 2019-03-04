import {Compiler, Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {DataService} from './services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private _compiler: Compiler, private authService: AuthService, private dataService: DataService
    ) {
        this._compiler.clearCache();

        if (localStorage.getItem('token')) {
            this.authService.getUserData(localStorage.getItem('token'))
                .subscribe(
                    (data) => {
                        if (data.opr) {
                            this.dataService.sendData(data.value);
                            localStorage.setItem('token', data.value.token);
                        } else {
                            localStorage.removeItem('token');
                        }
                    },
                    err => {
                        console.log(err.text());
                    }
                );
        }
    }
}
