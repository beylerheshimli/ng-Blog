import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';

import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';


import {AppRoutes} from './app.routing';

import {SharedModule} from './shared/shared.module';
import {AuthService} from './services/auth.service';
import {TranslateService} from './services/translate.service';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import {AppConfig} from './app.config';
import {BlogComponent} from './components/blog/blog.component';
import {BlogService} from './services/blog.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditBlogComponent} from './components/blog/edit-blog/edit-blog.component';
import {WeatherService} from './services/weather.service';


export function setupTranslateFactory(
    service: TranslateService): Function {
    return () => service.use(localStorage.getItem('lang') || 'az');
}

@NgModule({
    declarations: [
        AppComponent,
        AuthLayoutComponent,
        MainLayoutComponent,
        BlogComponent,
        EditBlogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),//, {useHash: true},
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        TranslateService,
        AppConfig,
        DataService,
        BlogService,
        WeatherService,
        {
            provide: APP_INITIALIZER,
            useFactory: setupTranslateFactory,
            deps: [
                TranslateService
            ],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
