import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent }  from './register/index';
import { LoginComponent }     from './login/index';
import { DashboardComponent } from './dashboard/index';
import { AuthGuard }          from './shared/index';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);