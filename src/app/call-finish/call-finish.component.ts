import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-finish',
  templateUrl: './call-finish.component.html',
  styleUrls: ['./call-finish.component.scss']
})
export class CallFinishComponent implements OnInit {
  score:number;
  over:number;

  constructor() { }

  ngOnInit() {
    this.score = 0;
    this.over = 0;
  }
}
