import { Injectable } from "@angular/core";
import { UrlSegment } from "@angular/router";
import { Location } from "../model/location.model";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    activeLocations: Location[] = [];   // locations ticked
    locations: Location[] = []; // all locations at site
    
    activeStatuses: string[] = [];  // states ticked
    statuses = ['Breached', 'Occupied', 'NonRenewed', 'OutOfService', 'Free'];

    getActiveLocations(): Location[] {
        return this.activeLocations;
    }

    getActiveStatuses(): string[] {
        return this.activeStatuses;
    }

    previousUrl!: UrlSegment[];
}