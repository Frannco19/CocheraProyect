import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StateGarageComponent } from './pages/state-garage/state-garage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardContainerComponent } from './pages/dashboard-container/dashboard-container.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { onlyPublicGuard } from './guards/only-public.guard';
import { onlyLoginGuard } from './guards/only-login.guard';
import { onlyadminGuard } from './guards/only-admin.guard';
import { RegisterComponent } from './pages/register/register.component';
import { PricesComponent } from './pages/prices/prices.component';

export const routes: Routes = [
    {
        path: "",
        component: DashboardContainerComponent,
        canActivate: [onlyLoginGuard],
        children:[
            {
                path:"state-garage",
                component: StateGarageComponent
            },
            {
                path:"reports",
                component: ReportsComponent,
                canActivate: [onlyadminGuard]
            },
            {
                path:"prices",
                component: PricesComponent,
                canActivate: [onlyadminGuard]
            },
        ]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [onlyPublicGuard]
    },
    {
        path:"register",
        component: RegisterComponent,
        canActivate: [onlyPublicGuard]
    },
    {
        path:"not-found",
        component: NotFoundComponent,
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    }
];
