import { Routes } from '@angular/router';

import { LoginFormComponent } from '../components/loginform/loginform.component';
import { RegisterFormComponent } from '../components/registerform/registerform.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'register',
        component: RegisterFormComponent
    }
];
