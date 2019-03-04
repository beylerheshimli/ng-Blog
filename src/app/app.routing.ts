import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {BlogComponent} from './components/blog/blog.component';
import {EditBlogComponent} from './components/blog/edit-blog/edit-blog.component';


export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full',
},
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'blog',
                component: BlogComponent
            },
            {
                path: 'edit-blog/:id',
                component: EditBlogComponent,
                // canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'session',
                loadChildren: './components/session/session.module#SessionModule'  //laaz load module
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'session/404'
    }
];
