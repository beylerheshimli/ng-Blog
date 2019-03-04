import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TranslatePipe} from './translate.pipe';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        SpinnerComponent,
        NavbarComponent,
        SidebarComponent,
        TranslatePipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        SpinnerComponent,
        NavbarComponent,
        SidebarComponent,
        TranslatePipe
    ]
})
export class SharedModule {
}
