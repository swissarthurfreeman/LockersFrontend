import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Locker } from '../../model/locker.model';
import { Location } from '../../model/location.model';
import { LocationService } from 'src/app/service/location.service';
import { FormBuilder } from '@angular/forms';
import { Contract } from 'src/app/model/contract.model';
import { ContractService } from 'src/app/service/contract.service';

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
    private contractService: ContractService
  ) {}

  @Input()
  locker!: Locker;

  locations!: Location[];

  contractForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    phone_number: '',
    email: ''
  });
  
  ngOnInit(): void {
    
    this.locations = [];
    this.locationService.getLocationsOf(this.locker.location.site)
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
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
