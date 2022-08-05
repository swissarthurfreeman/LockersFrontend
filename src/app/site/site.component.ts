import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocationService } from '../service/location.service';
import { FormBuilder, FormControl, FormControlDirective } from '@angular/forms';
import { Location } from "../model/location.model";
import { LockerService } from '../service/locker.service';
import { Locker } from '../model/locker.model';
import { StateService } from '../service/State.service';
import { Subject } from 'rxjs';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
})
export class SiteComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private locationService: LocationService, 
    private formBuilder: FormBuilder,
    private lockerService: LockerService,
    public stateService: StateService,
  ) {}

  siteName!: string;
  listForm = this.formBuilder.group({});

  ngOnInit(): void {
    this.route.url.subscribe((url) => this.stateService.previousUrl = url);
    
    this.stateService.statuses.forEach((stat) => {
      const control = new FormControl();
      control.setValue(this.isActiveStat(stat)); // sets status of checkbox, we can't mix template with FormControl, because AnGuLAR
      this.listForm.registerControl(stat, control);
    });
    
    this.route.paramMap.subscribe(params => { 
      this.siteName = params.get('name')!;  // even though it may look like it could be null, it won't be (!)
    });

    this.stateService.locations = [];
    this.locationService.getLocationsOf(this.siteName)
    .subscribe(
      locationList => {
        locationList.forEach((loc) => {
          this.stateService.locations.push(loc);
          const control = new FormControl();
          control.setValue(this.isActiveLoc(loc)); // sets status of checkbox, we can't mix template with FormControl, because AnGuLAR
          this.listForm.registerControl(loc.name, control); // Register controls for checkboxes
        });
        this.lockerForm.setValue({  // fills with pre-defined values locker creation form.
          number: 1602,
          verticalPosition: "en hauteur",
          lock: 'oui',
          locationName: this.stateService.locations[0].name,
          dimensions: '75/80/25'
        })      
        this.consultClick.next(); // tell child to refresh
      }
    )
  }

  consultClick: Subject<void> = new Subject<void>;

  displayList() {
    this.stateService.activeStatuses = [];
    this.stateService.activeLocations = [];
    
    Object.entries(this.listForm.value).forEach(
      ([key, val]) => {  
        if(val === true) {  // for all selected values
          if(this.stateService.statuses.indexOf(key) != -1) {  // if it's a status
            this.stateService.activeStatuses.push(key);
          } else {
            // if it's a location, add it to array of selected locations
            let i = this.stateService.locations.findIndex(loc => loc.name == key );
            this.stateService.activeLocations.push(this.stateService.locations[i]);
          }
        }
      }
    )
    this.consultClick.next();
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
    
    const loc: Location = this.stateService.locations.find(loc => loc.name === this.lockerForm.value.locationName)!;  // don't worry ts, this won't be undefined, hopefully...
    newLocker.location = loc;

    this.lockerService.postLocker(newLocker, loc)
    .subscribe(
      (locker: Locker) => { console.log("Backend returned ", locker); },
      error => { throw error; }
    );
  }

  isActiveLoc(location: Location) {
      return this.stateService.activeLocations.findIndex((loc) => { return loc.name === location.name && loc.site === location.site }) != -1;
  }

  isActiveStat(status: string) {;
      return this.stateService.activeStatuses.indexOf(status) != -1;
  }

  locationRenameForm = this.formBuilder.group({
    oldName: '',
    newName: ''
  });

  renameLocation(): void {
    console.log(this.locationRenameForm.value);
    const location = this.stateService.locations.find(loc => loc.name === this.locationRenameForm.value.oldName)!;
    console.log(location);
    location.name = this.locationRenameForm.value.newName!;
    this.locationService.updateLocation(location)
    .subscribe(
      (updatedLoca) => { console.log("Updated Location to", updatedLoca)},
      (err) => { throw err; }
    );
  }
}
