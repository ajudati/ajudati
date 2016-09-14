import { NgModule               } from '@angular/core';
import { BrowserModule          } from '@angular/platform-browser';
import { FormsModule            } from '@angular/forms';
import { HttpModule             } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './shared/index';

import { AppComponent           } from './app.component';
import { RegisterComponent      } from './register/index';
import { routing                } from './app.routing';
import { UserService,
         EqualValidator,
         EmailExistingValidator } from './shared/index';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule, routing, 
    //InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [AppComponent, RegisterComponent, EmailExistingValidator, EqualValidator],
  bootstrap: [AppComponent],
  providers: [UserService]
})
export class AppModule { }