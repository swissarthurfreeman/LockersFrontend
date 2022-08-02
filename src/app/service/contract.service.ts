import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { Location } from "../model/location.model";
import { Locker } from "../model/locker.model";

@Injectable({providedIn: 'root'})   // wtf does this line do ?
export class ContractService {
    constructor(private http: HttpClient) { }

    getContractsOf(location: Location): Observable<Locker[]> {
        return this.http.get<Locker[]>(`${environment.apiUrl}/lockers?site=${location.site}&name=${location.name}`);
    }

    postLocker(locker: Locker, at: Location): Observable<Locker> {
        console.log("Posting Locker =", locker);
        return this.http.post<Locker>(`${environment.apiUrl}/lockers`, {
            "number": locker.number, 
            "verticalPosition": locker.verticalPosition,
            "lock": locker.lock,
            "locationId": at.locationId,
            "dimensions": locker.dimensions
        });
    }
}