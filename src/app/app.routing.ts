import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent }  from './register/register.component';
import { LoginComponent }     from './login/login.component';
import { ProfileComponent }   from './profile/profile.component';
import { CallFormComponent }   from './call-form/call-form.component';
import { HelperSearchComponent }   from './helper-search/helper-search.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/callform',
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
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'callform',
    component: CallFormComponent
  },
  {
    path: 'helpersearch',
    component: HelperSearchComponent
  }

];

export const routing = RouterModule.forRoot(appRoutes);