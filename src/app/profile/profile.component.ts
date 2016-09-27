import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { ProfileService } from '../profile.service';
//import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { CallService } from '../call.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editing:boolean;
  currentProfile:FirebaseObjectObservable<any>;
  currentUser:FirebaseObjectObservable<any>;
  //currentCalls:FirebaseListObservable<any>;

  constructor(private route:ActivatedRoute,
              private ps:ProfileService,
              private us:UserService,
              private cs:CallService) { }

  ngOnInit() {
    this.editing = false;
    this.route.params.forEach((params: Params) =>{
      let uid:string = params['uid'];
      this.currentProfile = this.ps.getProfile(uid);
      this.currentUser    = this.us.getUser(uid);
    });
  }
  showForm(){
    this.editing = true;
  }
  hideForm(){
    this.editing = false;
  }

}
