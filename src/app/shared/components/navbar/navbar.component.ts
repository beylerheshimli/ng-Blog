import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '../../../services/translate.service';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {DataService} from '../../../services/data.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    pushRightClass: any = 'push-right';
    userData: any = {};
    subscription: Subscription;

    constructor(public router: Router, public translate: TranslateService, public authService: AuthService, public dataService: DataService) {
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
        this.subscription = this.dataService.sharedData$.subscribe(data => {
            this.userData = data;
        });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    logOut() {
        this.authService.logout();
        this.dataService.sendData('Empty');
        this.router.navigate(['/session/signin']);
    }

    setLang(lang: string) {
        this.translate.use(lang);
    }
}
