import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { ProfileService } from '../profile.service';
import { CallService } from '../call.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user  = {name: 'Fulano da Silva'};
  profile = {
    name: '',
    photo: '',
    description: '',
    skills: [],
    callsID:[]
  };
  calls = [
  ];

  currentProfile:FirebaseObjectObservable<any>;
  currentUser:FirebaseObjectObservable<any>;
  currentCalls:FirebaseListObservable<any>;

  constructor(private route:ActivatedRoute,
              private ps:ProfileService,
              private us:UserService,
              private cs:CallService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) =>{
      let uid:string = params['uid'];
      this.currentProfile = this.ps.getProfile(uid);
      this.currentUser    = this.us.getUser(uid);
      this.currentCalls   = this.cs.getCalls(uid);
      //this.ps.getProfile(uid).then(profile => this.profile = profile);
      //this.cs.getCalls(uid).then(calls => this.calls = calls);
    });
  }

}
