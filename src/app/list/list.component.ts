import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SelectionService } from '../service/selection.service';
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
    this.activeLocations.forEach((loc) => {
      this.contractService.getContractsOf(loc)
      .subscribe((contracts: Contract[]) => {
        contracts.forEach((contr) => {
          console.log(contr.status, this.activeStatuses);
          if(this.activeStatuses.indexOf(contr.status)  != -1) {
            this.contracts.push(contr);
          }
        })
      }, (error) => { throw error; })
    })
  }

  ngOnChanges(changes: any) {
    for(let key in changes) {
      this.contracts = [];
      this.freeLockers = [];  // temporary ugly solution, re-query every time... (this is what was done previously)
      this.getLockers();
      this.getContracts();
      console.log(this.contracts);
    }
  }

  ngOnInit(): void {}
}
