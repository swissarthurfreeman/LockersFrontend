import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StateService } from '../service/State.service';
import { ContractService } from '../service/contract.service';
import { Contract } from '../model/contract.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router, 
    public stateService: StateService,
    public contractService: ContractService
  ) {}
  sites = ['Sciences', 'Battelle', 'Uni-Mail'];
  
  // TODO : get locations and keep all sites and fill array based on that.
  ngOnInit(): void {
    
  }
}
