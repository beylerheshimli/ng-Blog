import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {DataService} from '../../../services/data.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    messageClass;
    message;
    processing = false;
    form: FormGroup;

    constructor(private formBuilder: FormBuilder,
                public authService: AuthService,
                private router: Router,
                private dataService: DataService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                this.validateEmail])],
            password: ['', Validators.required]
        });
    }

    validateEmail(controls) {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return {'validateEmail': true};
        }
    }


    disableForm() {
        this.form.controls['email'].disable();
        this.form.controls['password'].disable();
    }

    enableForm() {
        this.form.controls['email'].enable();
        this.form.controls['password'].enable();
    }

    onLoginSubmit() {
        this.processing = true;
        this.disableForm();

        const user = {
            email: this.form.get('email').value,
            password: this.form.get('password').value
        };

        this.authService.signin(user)
            .subscribe(
                (data) => {
                    if (data.opr) {
                        localStorage.setItem('token', data.value.token);
                        this.dataService.sendData(data.value);
                        this.router.navigate(['/blog']);
                    } else {
                        this.messageClass = 'alert alert-danger';
                        this.message = data.msg;
                        this.processing = false;
                        this.enableForm();
                    }
                },
                err => {
                    this.messageClass = 'alert alert-danger';
                    this.message = err.text();
                    this.processing = false;
                    this.enableForm();
                }
            );
    }
}
