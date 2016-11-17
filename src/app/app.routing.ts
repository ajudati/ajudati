import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent }  from './register/register.component';
import { LoginComponent }     from './login/login.component';
import { ProfileComponent }   from './profile/profile.component';
import { CallFormComponent }   from './call-form/call-form.component';
import { HelperSearchComponent }   from './helper-search/helper-search.component';
import { ChatComponent }   from './chat/chat.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { CallComponent }      from './call/call.component';
import { CallsSearchComponent }      from './calls-search/calls-search.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { RootGuard } from './root.guard';
import { ChatGuard } from './chat.guard';
import { CallStoredGuard } from './call-stored.guard';

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
    component: ProfileComponent
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
    component: HelperSearchComponent,
    canActivate: [CallStoredGuard]
  },
  {
    path: 'chat/:id',  
    component: ChatComponent,
    canActivate: [ChatGuard]
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
  },
  {
    path: 'callssearch',
    component: CallsSearchComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);