import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import * as firebase from 'firebase';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';

import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CallFormComponent } from './call-form/call-form.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { HelperSearchComponent } from './helper-search/helper-search.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { CallsSearchComponent } from './calls-search/calls-search.component';
import { ChipsComponent } from './chips/chips.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { routing } from './app.routing';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';
import { CallService } from './call.service';
import { AuthService } from './auth.service';
import { EqualValidatorDirective } from './equal-validator.directive';
import { EmailExistingValidatorDirective } from './email-existing-validator.directive';
import { FocusDirective } from './focus.directive';
import { AuthGuard } from './auth.guard';
import { RootGuard } from './root.guard';
import { ChatGuard } from './chat.guard';
import { CallComponent } from './call/call.component';


const myFirebaseConfig = {
  apiKey: "AIzaSyBvrsSbR75AMNElZ59dYWCflnbVuI1pK4k",
  authDomain: "ajudati2.firebaseapp.com",
  databaseURL: "https://ajudati2.firebaseio.com",
  storageBucket: "ajudati2.appspot.com",
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    CallFormComponent,
    CallsListComponent,
    HelperSearchComponent,
    ChatComponent,
    EvaluationComponent,
    CallsSearchComponent,
    ChipsComponent,
    EqualValidatorDirective,
    EmailExistingValidatorDirective,
    FocusDirective,
    SettingsComponent,
    ProfileFormComponent,
    CallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,

    Ng2PaginationModule,

    MaterialModule,

    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [UserService, ProfileService, CallService, AuthService, AuthGuard, RootGuard, ChatService, ChatGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
