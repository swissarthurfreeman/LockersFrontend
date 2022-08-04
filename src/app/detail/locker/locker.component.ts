import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Locker } from '../../model/locker.model';
import { Location } from '../../model/location.model';
import { LocationService } from 'src/app/service/location.service';
import { FormBuilder } from '@angular/forms';
import { Contract } from 'src/app/model/contract.model';
import { ContractService } from 'src/app/service/contract.service';
import { LockerService } from 'src/app/service/locker.service';
import { StateService } from 'src/app/service/State.service';

@Component({
  selector: 'app-locker',
  templateUrl: './locker.component.html'
})
export class LockerComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private lockerService: LockerService,
    private stateService: StateService
  ) {}

  lockerId!: string;
  locker!: Locker;

  locations!: Location[];

  contractForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    phone_number: '',
    email: ''
  });

  moveForm = this.formBuilder.group({
    locationId: ''
  });

  invalidForm = this.formBuilder.group({
    'OutOfServiceReason': ''
  })
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.lockerId = params.get('lockerId')!;
      this.lockerService.getLockerBy(this.lockerId)
      .subscribe((locker: Locker) => {
        this.locker = locker;
      });
    });

    this.locations = [];
    this.locationService.getAllLocations()
    .subscribe((locations: Location[]) => {
      locations.forEach((loc: Location) => this.locations.push(loc));
    });
  }

  createContractAtLocker(): void {
    let contr = new Contract();
    contr.email = this.contractForm.value.email!;
    contr.phone_number = this.contractForm.value.phone_number!;
    contr.lastname = this.contractForm.value.lastname!;
    contr.firstname = this.contractForm.value.firstname!;

    contr.locker = this.locker;

    this.contractService.postContract(contr)
    .subscribe((contr) => {
      console.log("Posted Contract");
      this.reloadCurrentRoute();
    }, (err) => { throw err; });
  }

  moveLocker() {
    console.log("Submitted form =", this.moveForm.value);
    this.locker.locationId = parseInt(this.moveForm.value.locationId!);
    this.lockerService.putLocker(this.locker)
    .subscribe((updated) => { 
      this.reloadCurrentRoute(); 
    }, (err) => { throw err; });
  }

  markInvalid() {
    this.locker.OutOfService = true;
    this.locker.OutOfServiceReason = this.invalidForm.value.OutOfServiceReason!;
    this.lockerService.putLocker(this.locker)
    .subscribe((updated) => { 
      console.log("Marked Locker as out of service"); 
      console.log("Updated locker", updated);
      this.reloadCurrentRoute(); 
    }, (err) => { throw err; });
  }

  markValid(lockerId: string) {
    this.locker.OutOfService = false;
    this.locker.OutOfServiceReason = null!;
    this.lockerService.putLocker(this.locker)
    .subscribe((updated) => { 
      console.log("Marked Locker as in service"); 
      console.log("Updated locker", updated);
      //this.reloadCurrentRoute();
    }, (err) => { throw err; });
  }

  delete(lockerId: string) {
    console.log("Deleting locker", lockerId);
    this.lockerService.deleteLockerBy(lockerId).subscribe((lol) => { console.log("Deleted locker ?")}, (err) => {throw err; });
    this.router.navigate(this.stateService.previousUrl);
  }
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
