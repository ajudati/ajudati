import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CallService } from '../call.service';
import { AuthService } from '../auth.service';
import { Call } from '../call';

@Component({
  selector: 'app-call-form',
  templateUrl: './call-form.component.html',
  styleUrls: ['./call-form.component.scss']
})
export class CallFormComponent implements OnInit {
  model = {title: '', description: ''};
  active:boolean;
  constructor(private router: Router,
              private cs:CallService,
              private af:AuthService) { 
    this.active = true;
  }

  ngOnInit() {
    this.cs.currentCall = null;
    this.active         = true;
  }
  async onSubmit() {
    let newCall:Call = new Call();
    Object.assign(newCall,this.model);
    if(this.af.authenticated){
      newCall.owner = this.af.id;
      await this.cs.createCall(newCall);
    }
    this.cs.currentCall = newCall;
    this.router.navigate(['/helpersearch']);
  }
  clearFields(){
    this.model = {title: '', description: ''};
    this.active = false;
    setTimeout(()=> this.active=true, 0);
  }
}