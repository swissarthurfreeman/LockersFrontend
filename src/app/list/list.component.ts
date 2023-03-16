import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Locker } from '../model/locker.model';
import { LockerService } from '../service/locker.service';
import { Location } from '../model/location.model';
import { Contract } from '../model/contract.model';
import { ContractService } from '../service/contract.service';
import { Observable, Subscription } from 'rxjs';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private lockerService: LockerService,
    private contractService: ContractService,
    public stateService: StateService
  ) {}

  freeLockers!: Locker[];
  brokenLockers!: Locker[];

  contracts: Contract[] = [];
  
  getLockers(): void {
    this.stateService.activeLocations.forEach((loc) => {
        this.lockerService.getLockersOf(loc)
        .subscribe((lockers) => {
          lockers.forEach((locker) => {
              if(this.stateService.activeStatuses.indexOf('OutOfService') != -1)
                if(locker.OutOfService)
                  this.brokenLockers.push(locker);

              if(this.stateService.activeStatuses.indexOf('Free') != -1)
                if(!locker.OutOfService)
                  this.freeLockers.push(locker);
          });
          this.freeLockers.sort((l1, l2) => l1.number - l2.number);
          this.brokenLockers.sort((l1, l2) => l1.number - l2.number);
        })
    });
  }

  getContracts(): void {
    this.stateService.activeLocations.forEach((loc) => {
      this.contractService.getContractsOf(loc)
      .subscribe((contracts: Contract[]) => {
        contracts.forEach((contr: Contract) => {
          if(this.stateService.activeStatuses.indexOf(contr.status) != -1) {
            this.contracts.push(contr);
          }
        })
        this.contracts.sort((c1, c2) => {
          return c1.locker.number - c2.locker.number 
        });
      });
    })
  }

  private eventSubscribtion!: Subscription; // refresh list on click in parent
  @Input() parentConsult!: Observable<void>;

  loadList() {
    this.contracts = [];
    this.freeLockers = [];  // temporary ugly solution, re-query every time... (this is what was done previously)
    this.brokenLockers = [];
    this.getLockers();
    this.getContracts();
  }

  ngOnInit(): void {
    this.eventSubscribtion = this.parentConsult.subscribe(() => this.loadList());
  }

  ngOnDestroy() {
    this.eventSubscribtion.unsubscribe();
  }

  selectContractOrLocker(lockerId: string) {
    this.router.navigate([lockerId], {relativeTo: this.route});
  }
}
