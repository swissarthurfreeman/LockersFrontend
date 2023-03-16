import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from './model/contract.model';
import { ContractService } from './service/contract.service';
import { StateService } from './service/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'LockerFrontend';
  constructor(
    private router: Router,
    public stateService: StateService,
    public contractService: ContractService
    ) {
  }

  // check wether user or admin and if user redirect if has a contract.
  ngOnInit() {
    // here call rest api and get the sites
    this.stateService.getCredentials()
    .subscribe((val: any) => {
      this.stateService.firstname = val.firstname;
      this.stateService.lastname = val.lastname;
      this.stateService.group = val.group;
      this.stateService.email = val.email;

      if(this.stateService.group === 'user') {
        this.stateService.statuses = ['Free'];
        this.contractService.getContracts() // check user has a contract or not
        .subscribe((contracts: Contract[]) => {
          if(contracts.length > 0) {
            this.router.navigate(['/contracts']);
          }
        })
      }
    })
  }
}
