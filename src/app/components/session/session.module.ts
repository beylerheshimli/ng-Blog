import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SessionRoutes} from './session.routing';
import {NotFoundComponent} from './not-found/not-found.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SessionRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        NotFoundComponent,
        SigninComponent,
        SignupComponent
    ]
})

export class SessionModule {
}
