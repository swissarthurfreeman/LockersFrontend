import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { Location } from "../model/location.model";

@Injectable({providedIn: 'root'})   // wtf does this line do ?
export class LocationService {
    constructor(private http: HttpClient) { }

    getLocationsOf(site: string): Observable<Location[]> {
        return this.http.get<Location[]>(`${environment.apiUrl}/locations?site=${site}`);
    }

    getAllLocations(): Observable<Location[]> {
        return this.http.get<Location[]>(`${environment.apiUrl}/locations`);
    }

    postLocation(site: string | null | undefined, name: string | null | undefined): Observable<Location> {
        return this.http.post<Location>(`${environment.apiUrl}/locations`, {
            "site": site, 
            "name": name
        });
    }

    updateLocation(to: Location): Observable<Location> {
        return this.http.put<Location>(`${environment.apiUrl}/locations/${to.locationId}`, to);
    }

    delete(locationId: string): Observable<null> {
        return this.http.delete<null>(`${environment.apiUrl}/locations/${locationId}`);
    }
}