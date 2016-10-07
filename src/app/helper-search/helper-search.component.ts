import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { ProfileService } from '../profile.service';
import { UserService } from '../user.service';
import { CallService } from '../call.service';
import { AuthService } from '../auth.service';
import { ICall } from '../call';
import { ChipsComponent } from '../chips/chips.component';

@Component({
  selector: 'app-helper-search',
  templateUrl: './helper-search.component.html',
  styleUrls: ['./helper-search.component.scss']
})
export class HelperSearchComponent implements OnInit {
  @ViewChild(ChipsComponent) chips:ChipsComponent;
  results:Observable<any>;
  tags:string[];
	users:Object;
  call:ICall;

  constructor(private ps:ProfileService,
  						private us:UserService,
              private cs:CallService,
              private as:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.call = this.cs.currentCall;
  	this.users = {};
    this.results = null;
    this.onSearch(null);
    this.chips.registerOnChange(this.onChangeSkills.bind(this));
  }
  viewProfile(profileid:string){
    this.router.navigate(['profile',profileid]);
  }

  onChangeSkills(arg:string[])
  {
    this.tags = arg;
    this.onSearch(this.tags);
  }

  onSearch(tags){
    this.users = {};
    this.results = this.ps.searchSkills(tags);
    this.results.subscribe(value=>{
      if(value.hits)
      {
        value.hits.forEach(profile => {
          this.users[profile._id] = this.us.getUser(profile._id)});
      }
    });
  }
}
