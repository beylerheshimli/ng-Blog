import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private router: Router) {

    }

    private subject = new BehaviorSubject<any>('Empty');
    sharedData$ = this.subject.asObservable();

    sendData(value: any) {
        this.subject.next(value);
        console.log('sendSharedData', value);
    }

    setError(err: HttpErrorResponse, url: string) {
        console.log('com', err);
        if (err.status === 500) {
            return [{severity: 'warn', summary: 'Diqqət!', detail: err.error}];
        } else if (err.status === 0) {
            return [{severity: 'info', summary: 'Diqqət!', detail: 'Zəhmət olmasa internet əlaqənizi yoxlayın'}];
        } else if (err.status === 404) {
            return [{severity: 'info', summary: 'Diqqət!', detail: err.error === '' ? 'Məlumat tapılmadı' : err.error}];
        } else if (err.status === 401) {
            setTimeout(() => {
                this.router.navigate(['session/signin'], {queryParams: {returnUrl: url}});
            }, 3000);

            return [{severity: 'warn', summary: 'Diqqət!', detail: 'Sizin sessiyanız başa çatdı'}];
        }
    }
}
