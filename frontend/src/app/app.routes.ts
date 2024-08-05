import { Routes } from '@angular/router';

import { LoginFormComponent } from '../components/loginform/loginform.component';
import { RegisterFormComponent } from '../components/registerform/registerform.component';
import { MoviesListComponent } from '../components/movieslist/movieslist.component';
import { MovieDetailsComponent } from '../components/moviedetails/moviedetails.component';

export const routes: Routes = [
    {
        path: '',
        component: MoviesListComponent
    },
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'register',
        component: RegisterFormComponent
    },
    {
        path: 'movie/:id',
        component: MovieDetailsComponent
    }
];
