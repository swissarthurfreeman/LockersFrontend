import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// here we gotta query the api filtering locations at the app site
// and dump them into an array. We also get statuses of lockers.

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html'
})
export class NotFound implements OnInit {

  constructor() {}
  ngOnInit(): void {}
}
