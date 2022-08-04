import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Locker } from '../model/locker.model';
import { LockerService } from '../service/locker.service';
import { Location } from '../model/location.model';
import { Contract } from '../model/contract.model';
import { ContractService } from '../service/contract.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private lockerService: LockerService,
    private contractService: ContractService
  ) {}

  @Input()
  activeLocations: Location[] = [];

  @Input()
  activeStatuses: string[] = [];

  freeLockers: Locker[] = [];
  contracts: Contract[] = [];
  
  getLockers(): void {
    this.activeLocations.forEach((loc) => {
        this.lockerService.getLockersOf(loc)
        .subscribe((lockers) => {
            lockers.forEach((locker) => {
                this.freeLockers.push(locker);
            });
        })
    });
  }

  getContracts(): void {
    console.log(this.activeStatuses);
    this.activeLocations.forEach((loc) => {
      this.contractService.getContractsOf(loc)
      .subscribe((contracts: Contract[]) => {
        contracts.forEach((contr: Contract) => {
          if(this.activeStatuses.indexOf(contr.status)  != -1) {
            this.contracts.push(contr);
          }
        })
      }, (error) => { throw error; })
    })
  }

  ngOnChanges(changes: any) {
    this.contracts = [];
    this.freeLockers = [];  // temporary ugly solution, re-query every time... (this is what was done previously)
    this.getLockers();
    this.getContracts();
  }

  ngOnInit(): void {}

  selectContractOrLocker(lockerId: string) {
    console.log("Selected ContractOrLocker" + lockerId);
    this.router.navigate([lockerId], {relativeTo: this.route});
  }
}
