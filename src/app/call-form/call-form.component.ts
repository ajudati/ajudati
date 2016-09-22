import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-form',
  templateUrl: './call-form.component.html',
  styleUrls: ['./call-form.component.scss']
})
export class CallFormComponent implements OnInit {
  model = {title: '', description: ''};
  constructor(private router: Router) { }

  ngOnInit() {

  }
  onSubmit() {
    this.router.navigate(['/helpersearch']);
  }
}
