import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContractService } from '../service/contract.service';
import { Contract } from '../model/contract.model';
import { StateService } from '../service/State.service';
// here we gotta query the api filtering locations at the app site
// and dump them into an array. We also get statuses of lockers.

@Component({
  selector: 'app-usercontracts',
  templateUrl: './usercontracts.component.html'
})
export class UserContractsComponent implements OnInit {

  constructor(
    public contractService: ContractService, 
    public stateService: StateService,
    public router: Router
  ) {}

  contracts: Contract[] = [];

  ngOnInit(): void {
    this.contracts = [];
    this.contractService.getContracts()
    .subscribe(
      (contracts: Contract[]) => {
        contracts.forEach((contr) => {
          this.contracts.push(contr);
        })
      },
      (err) => { throw err; }
    )
  }

  renewContract(lockerId: string) {
    let contr = this.contracts.find((contr) => { return contr.lockerId === lockerId })!;
    this.contractService.update(contr)
    .subscribe(
      (updated) => { 
        contr = updated;
        this.reloadCurrentRoute();
      },
      (err) => { throw err; }
    );
    
    /*contract.lockerId = lockerId;
    console.log("Renewing contract...");*/
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
