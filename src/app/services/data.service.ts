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
    }
}
