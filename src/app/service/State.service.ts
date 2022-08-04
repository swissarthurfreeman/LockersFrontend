import { Injectable } from "@angular/core";
import { Location } from "../model/location.model";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    locations: Location[] = [];
    statuses: string[] = [];

    getLocations(): Location[] {
        return this.locations;
    }

    getStatuses(): string[] {
        return this.statuses;
    }
}