import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocationService } from '../service/location.service';
import { FormBuilder } from '@angular/forms';
import { Location } from "../model/location.model";
// here we gotta query the api filtering locations at the app site
// and dump them into an array. We also get statuses of lockers.

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html'
})
export class SiteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private locationService: LocationService, private formBuilder: FormBuilder) {}

  siteName!: string;
  locations: Location[] = [];
  statuses = ['Rupture de Contract', 'Occupé', 'Hors Service', 'Libre'];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.siteName = params.get('name')!;  // even though it may look like it could be null, it won't be (!)
    });

    this.locationService.getLocationsOf(this.siteName).subscribe(
      locationList => {
        locationList.forEach((loc) => {
          this.locations.push(loc);
        });
        this.lockerForm.setValue({
          number: 1602,
          verticalPosition: "en hauteur",
          lock: 'oui',
          locationName: this.locations[0].name,
          dimensions: '75/80/25'
        })
      }
    )
  }

  locationForm = this.formBuilder.group({
    name: ''
  });

  submitLocation(): void {
    this.locationService.postLocation("Sciences", this.locationForm.value.name)
    .subscribe(
      loc => { console.log("Posted location =", loc); },
      error => { throw error; }
    ); 
  }

  lockerForm = this.formBuilder.group({
    number: 1602,
    verticalPosition: "en hauteur",
    lock: 'oui',
    locationName: '',
    dimensions: '75/80/25'
  })

  submitLocker(): void {
    console.log("Locker to post :");
    console.log(this.lockerForm.value);
  }
}
