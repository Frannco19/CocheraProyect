import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StateGarageComponent } from './pages/state-garage/state-garage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"state-garage",
        component: StateGarageComponent
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path:"not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    }
];
