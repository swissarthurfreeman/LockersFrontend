import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Locker } from '../model/locker.model';
import { LockerService } from '../service/locker.service';
import { Location } from '../model/location.model';
import { Contract } from '../model/contract.model';
import { ContractService } from '../service/contract.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private lockerService: LockerService,
    private contractService: ContractService
  ) {}

  lockerId!: string;
  contract!: Contract;
  locker!: Locker;
  isContract!: boolean;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
        // at this stage we don't know if it's a contract or a locker and if locker if it's out of service...
        this.lockerId = params.get('lockerId')!;   
        console.log(this.lockerId);

        this.contractService.getContractBy(this.lockerId)
        .subscribe((contr: Contract) => {
            this.contract = contr;
            this.isContract = true;
        }, (err) => {
            console.log(err.message);
            console.log("Contract not found, trying lockers");
            this.lockerService.getLockerBy(this.lockerId)
            .subscribe((locker) => {
                this.locker = locker;
                console.log(this.locker);
                this.isContract = false;
            }, (err) => {
                console.log(err.message);
                console.log("404 Not Found !!");
            })
        })
      });
  }
}
