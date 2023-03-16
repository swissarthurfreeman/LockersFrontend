import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Contract } from 'src/app/model/contract.model';
import { ContractService } from 'src/app/service/contract.service';
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
