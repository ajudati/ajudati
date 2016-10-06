import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
import { CallService } from '../call.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };
  err:string;

  constructor(
    private us: UserService, 
    private ps: ProfileService,
    private cs: CallService,
    private router:Router) { 
  }

  ngOnInit() {
    this.err = '';
  }

  async onSubmit(){
    let uid: string = await this.us.register(this.model.name, this.model.email,this.model.password);
    let profile:Profile = new Profile();
    await this.ps.createProfile(uid,profile);
    if(this.cs.currentCall){
      this.cs.currentCall.owner = uid;
      this.cs.createCall(this.cs.currentCall).then(()=>{
        this.cs.currentCall = null;
      });
    }
    console.log("after profile");
    this.router.navigate(['/login']);

    // this.us.register(this.model.name, this.model.email, this.model.password).then(() => {
    //   let profile:Profile = new Profile(uid);
    //   this.pf.createProfile(profile);
    //   this.router.navigate(['/login']);
    // }).catch(err => {
    //   this.err = err;
    // });
  }
}
