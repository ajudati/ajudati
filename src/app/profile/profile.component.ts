import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { ProfileService } from '../profile.service';
//import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { CallService } from '../call.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editing:boolean;
  uid:string;
  currentProfile:FirebaseObjectObservable<any>;
  currentUser:FirebaseObjectObservable<any>;
  pictureURL:firebase.Promise<any>;
  //currentCalls:FirebaseListObservable<any>;

  constructor(private route:ActivatedRoute,
              private ps:ProfileService,
              private us:UserService,
              private cs:CallService,
              private as:AuthService) { }

  ngOnInit() {
    this.editing = false;
    this.route.params.forEach((params: Params) =>{
      this.uid = params['uid'];
      this.currentProfile = this.ps.getProfile(this.uid);
      this.currentUser    = this.us.getUser(this.uid);
      this.pictureURL = this.ps.getPicture(this.uid);
    });
  }
  showForm(){
    this.editing = true;
  }
  hideForm(){
    this.editing = false;
    this.pictureURL = this.ps.getPicture(this.uid);
  }

}
