import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { ProfileService } from '../profile.service';
import { UserService } from '../user.service';
import { CallService } from '../call.service';
import { AuthService } from '../auth.service';
import { ICall, Call } from '../call';
import { CallStatus } from '../call-status.enum';
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
  usersData:Object;
  call:ICall;
  viewingProfile:boolean;
  profileId:string;
  skills:string[];
  pictures:Object;

  constructor(private ps:ProfileService,
  						private us:UserService,
              private cs:CallService,
              private as:AuthService,
              private snack:MdSnackBar,
              private router:Router) { 
    this.viewingProfile = false;
    this.pictures = {};
  }

  ngOnInit() {
    this.viewingProfile = false;
    this.call = this.cs.currentCall;
  	this.users = {};
    this.results = null;
    this.onSearch(null);
    this.profileId = null;
    this.skills = [];
  }
  viewProfile(profileid:string){
    this.profileId      = profileid;
    this.viewingProfile = true;
    //this.router.navigate(['profile',profileid]);
  }
  onSkillsChanged(){
    this.onSearch(this.skills);
  }
  choose(uid:string){
    if(this.as.authenticated){
      this.cs.addHelper(this.call.$key,uid).then(()=>{
        this.router.navigate(['callslist']);
        this.users[uid].subscribe(user=>this.snack.open(`Ajudante ${user.name} escolhido`,"OK",<Object>{'duration':2000}));
      });
    }else{
      let call:Call = this.cs.currentCall;
      call.helper = uid;
      call.helperAccepted = false;
      call.status = CallStatus.Accepting;
      call.ownerAccepted = true;
      call.ownerAcceptedAt = firebase.database['ServerValue']['TIMESTAMP'];
      this.router.navigate(['login']);
      this.snack.open(`Conecte-se primeiro`,"OK",<Object>{'duration':2000});
    }
  }
  onSearch(tags){
    console.log("searching");
    this.users = {};
    this.results = this.ps.searchSkills(tags);
    this.results.subscribe(value=>{
      if(value.hits){
        value.hits.forEach(profile => {
          this.users[profile._id]    = this.us.getUser(profile._id);
          this.pictures[profile._id] = this.ps.getPicture(profile._id);
        });
      }
    });
  }
}
