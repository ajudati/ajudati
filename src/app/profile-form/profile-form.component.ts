import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { Profile, IProfile } from '../profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  model:any;
  @Input() currentProfile:FirebaseObjectObservable<any>;
  @Input() currentUser:FirebaseObjectObservable<any>;
  @Output() cancel:EventEmitter<void>;
  @Output() saved:EventEmitter<void>;
  constructor() { 
    this.model = {$key:'', name:'',description:'', skills:[]};
    this.cancel = new EventEmitter<void>(false);
    this.saved = new EventEmitter<void>(false);
  }

  ngOnInit() {
    this.currentProfile.subscribe((profile) => {
      Object.assign(this.model,profile);
    });
    this.currentUser.subscribe((user) => {
      Object.assign(this.model, user);
    });
  }
  onCancel(){
    this.cancel.emit();
  }
  async onSubmit(){
    await Promise.all([
      this.currentUser.update({name:this.model.name}),
      this.currentProfile.update({description:this.model.description,skills:this.model.skills})
    ]);
    this.saved.emit();
  }
}
