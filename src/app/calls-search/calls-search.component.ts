import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CallService } from '../call.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-calls-search',
  templateUrl: './calls-search.component.html',
  styleUrls: ['./calls-search.component.scss']
})
export class CallsSearchComponent implements OnInit {
  results:Observable<any>;
  calls:Object = {};
  users:Object = {};
  constructor(private cs:CallService, private us:UserService, private router:Router) { }

  ngOnInit() {
    this.results = null;
  }

  onSearch(query:string){
    this.results = this.cs.search(query);
    this.results.subscribe(value=>{
      if(value.hits)
        value.hits.forEach(call => 
          this.users[call._source.owner] = this.us.getUser(call._source.owner));
    });
  }
  onHelping(callid:string){
    this.cs.helpCall(callid);
  }
  onServiceSelected(callid:string){
    this.router.navigate(['call',callid]);
  }
}
