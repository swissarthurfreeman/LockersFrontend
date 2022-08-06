import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from './model/contract.model';
import { ContractService } from './service/contract.service';
import { LocationService } from './service/location.service';
import { StateService } from './service/State.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'LockerFrontend';
  constructor(
    private router: Router, 
    private locationService: LocationService,
    public stateService: StateService,
    public contractService: ContractService
    ) {
  }
  userContracts: Contract[] = [];

  // check wether user or admin and if user redirect if has a contract.
  ngOnInit() {
    // here call rest api and get the sites
    console.log("App initialised");
    this.locationService.delete("kjsdgnjlsdgnsdljkgnmlsdlks")
    .subscribe(
      (nothing) => { 
        this.stateService.role = 'admin';
        console.log("Successfully deleted nothing, this is an admin account"); 
      },
      (err) => { 
        this.stateService.role = 'user';
        console.log("Access forbidden, this is not an admin account", err);
        this.stateService.statuses = ['Free'];
        if(this.stateService.role === 'user') { // check user has a contract or not
          this.contractService.getContracts()
          .subscribe((contracts: Contract[]) => {
            if(contracts.length > 0) {
              this.userContracts = contracts;
              console.log("You already have contracts mate, time to render them !");
              this.router.navigate(['/contracts']);
            }
          })
        }
      }
    )
  }
}
