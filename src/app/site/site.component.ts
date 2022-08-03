import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocationService } from '../service/location.service';
import { FormBuilder, FormControl, FormControlDirective } from '@angular/forms';
import { Location } from "../model/location.model";
import { LockerService } from '../service/locker.service';
import { Locker } from '../model/locker.model';
import { SelectionService } from '../service/selection.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html'
})
export class SiteComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private locationService: LocationService, 
    private formBuilder: FormBuilder,
    private lockerService: LockerService,
    private selectionService: SelectionService
  ) {}

  siteName!: string;
  locations: Location[] = []; // all locations at site
  statuses = ['Rupture de Contract', 'Occupied', 'Hors Service', 'Libre'];

  activeStatuses: string[] = [];
  activeLocations: Location[] = [];

  listForm = this.formBuilder.group({});

  ngOnInit(): void {
    this.statuses.forEach((stat) => {
      this.listForm.registerControl(stat, new FormControl());
    });
    
    this.route.paramMap.subscribe(params => { 
      this.siteName = params.get('name')!;  // even though it may look like it could be null, it won't be (!)
      this.selectionService.siteName = this.siteName;
    });

    this.locationService.getLocationsOf(this.siteName)
    .subscribe(
      locationList => {
        locationList.forEach((loc) => {
          this.locations.push(loc);
          this.listForm.registerControl(loc.name, new FormControl());
        });
        this.lockerForm.setValue({
          number: 1602,
          verticalPosition: "en hauteur",
          lock: 'oui',
          locationName: this.locations[0].name,
          dimensions: '75/80/25'
        })
        this.selectionService.locations = this.locations; 
      }
    )
  }

  redirectToListComponent() {
    this.activeStatuses = [];
    this.activeLocations = [];
    
    console.log(this.listForm.value);
    Object.entries(this.listForm.value).forEach(
      ([key, val]) => {  
        console.log(key, val)
        if(val === true) {  // for all selected values
          if(this.statuses.indexOf(key) != -1) {  // if it's a status
            this.activeStatuses.push(key);
          } else {
            // if it's a location, add it to array of selected locations
            let i = this.locations.findIndex(loc => loc.name == key );
            this.activeLocations.push(this.locations[i]);
          }
        }
      }
    )
    console.log(this.activeStatuses, this.activeLocations);
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
    let newLocker: Locker = new Locker();
    newLocker.number = this.lockerForm.value.number!;
    newLocker.dimensions = this.lockerForm.value.dimensions!;
    newLocker.verticalPosition = this.lockerForm.value.verticalPosition!;

    if(this.lockerForm.value.lock == 'oui')
      newLocker.lock = true;
    else
      newLocker.lock = false;
    
    const loc: Location = this.locations.find(loc => loc.name === this.lockerForm.value.locationName)!;  // don't worry ts, this won't be undefined, hopefully...
    newLocker.location = loc;

    this.lockerService.postLocker(newLocker, loc)
    .subscribe(
      (locker: Locker) => { console.log("Backend returned ", locker); },
      error => { throw error; }
    );
  }
}
