import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent }  from './register/register.component';
import { LoginComponent }     from './login/login.component';
import { ProfileComponent }   from './profile/profile.component';
import { CallFormComponent }   from './call-form/call-form.component';
import { HelperSearchComponent }   from './helper-search/helper-search.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { CallComponent }      from './call/call.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { RootGuard } from './root.guard';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [RootGuard],
    pathMatch: 'full',
    component: CallsListComponent
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
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:uid',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callform',
    component: CallFormComponent
  },
  {
    path: 'helpersearch',
    component: HelperSearchComponent
  },
  {
    path: 'callslist',
    component: CallsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'call/:id',
    component: CallComponent,
    canActivate: [AuthGuard]
  }



];

export const routing = RouterModule.forRoot(appRoutes);