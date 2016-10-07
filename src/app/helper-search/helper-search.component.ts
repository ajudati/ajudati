import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { ProfileService } from '../profile.service';
import { UserService } from '../user.service';
import { CallService } from '../call.service';
import { AuthService } from '../auth.service';
import { ICall } from '../call';

@Component({
  selector: 'app-helper-search',
  templateUrl: './helper-search.component.html',
  styleUrls: ['./helper-search.component.scss']
})
export class HelperSearchComponent implements OnInit {

	profiles:FirebaseListObservable<any>;
	users:Object;
  myId:string;
  call:ICall;

  constructor(private ps:ProfileService,
  						private us:UserService,
              private cs:CallService,
              private as:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.call = this.cs.currentCall;
    console.log(`call`, this.call);
    this.myId = this.as.id;
  	this.users = {};
  	this.profiles = <FirebaseListObservable<any>>this.ps.getProfiles();
  	this.profiles.subscribe(p => {
  		p.forEach(profile => {
	  		this.users[profile.$key] = this.us.getUser(profile.$key);
  		});
  	});
  }
  viewProfile(profileid:string){
    this.router.navigate(['profile',profileid]);
  }

}
