import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {WeatherService} from '../../../services/weather.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    showMenu: any = '';
    pushRightClass: any = 'push-right';

    weatherData: any = {
        name: '',
        temp: '',
        pressure: '',
        humidity: ''
    };

    constructor(public router: Router, private weatherService: WeatherService) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.getForecast();
    }


    getForecast() {
        this.weatherService.getForecast().subscribe(
            (data) => {
                console.log(data);
                if (data.successful) {
                    this.weatherData = data;
                }
            },
            err => {
                console.log(err.text());
            }
        );
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLogoutClick() {
        this.router.navigate(['/login']);
    }

}
