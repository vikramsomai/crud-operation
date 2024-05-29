import { Routes } from '@angular/router';
import { routerConstants } from './shared/constant/constants';
import { LoginComponent } from './core/components/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { loginAuthGuard } from './core/auth/guards/login-auth.guard';
import { inactiveAuthGuard } from './core/auth/guards/inactive-auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: routerConstants.Login, pathMatch: "full" },
    { path: routerConstants.Login, component: LoginComponent ,canActivate:[inactiveAuthGuard]},
    { path: routerConstants.Dashboard, component: DashboardComponent,canActivate:[loginAuthGuard] },
    { path: routerConstants.Register, component: SignupComponent,canActivate:[inactiveAuthGuard] },
    { path: routerConstants.WildCard, component: DashboardComponent,canActivate:[loginAuthGuard] },
];
