import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { ContractService } from '../service/contract.service';
import { LocationService } from '../service/location.service';
import { FormBuilder } from '@angular/forms';
import { Location } from '../model/location.model';
import { Confirmation } from '../model/confirmation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router, 
    public stateService: StateService,
    public contractService: ContractService,
    public locationService: LocationService,
    private formBuilder: FormBuilder
  ) {}
  
  sitesSet!: Set<string>;
  sites!: string[];

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getAllLocations()
    .subscribe((locations) => {
      this.sitesSet = new Set<string>();
      locations.forEach((loc) => { this.sitesSet.add(loc.site) });
      
      this.sites = [];
      this.sitesSet.forEach((val) => { this.sites.push(val); });
      this.sites.sort();
    });
  }

  siteForm = this.formBuilder.group({
    'site': '',
    'name': ''
  })

  submitLocation(buttonId: string) {
    const loca = new Location();
    loca.name = this.siteForm.value.name!;
    loca.site = this.siteForm.value.site!; 
    this.locationService.postLocation(loca.site, loca.name)
    .subscribe(
      (loca) => { 
        this.getLocations();
        this.stateService.addConfirmation(new Confirmation("Localisation enregistrée avec succès", "success", buttonId)); 
      },
      (err) => {
        this.stateService.addConfirmation(
          new Confirmation("Erreur d'enregistrement de localisation, message : " + err.error.message, "danger", buttonId));
      }
    )
  }
}
