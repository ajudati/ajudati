import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdListModule } from '@angular2-material/list';

import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';
import { CallService } from './call.service';
import { CallFormComponent } from './call-form/call-form.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { HelperSearchComponent } from './helper-search/helper-search.component';
import { ChatComponent } from './chat/chat.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { CallsSearchComponent } from './calls-search/calls-search.component';
import { ChipsComponent } from './chips/chips.component';
import { EqualValidatorDirective } from './equal-validator.directive';
import { EmailExistingValidatorDirective } from './email-existing-validator.directive';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RootGuard } from './root.guard';

import * as firebase from 'firebase';
import { SettingsComponent } from './settings/settings.component';

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
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,

    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,

    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [UserService, ProfileService, CallService, AuthService, AuthGuard, RootGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
