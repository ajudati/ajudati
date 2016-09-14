import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/index';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);