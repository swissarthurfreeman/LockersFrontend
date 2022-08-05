import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { Location } from "../model/location.model";
import { Locker } from "../model/locker.model";

@Injectable({providedIn: 'root'})   // wtf does this line do ?
export class LockerService {
    constructor(private http: HttpClient) { }

    getLockersOf(location: Location): Observable<Locker[]> {
        return this.http.get<Locker[]>(`${environment.apiUrl}/lockers?site=${location.site}&name=${location.name}`);
    }

    postLocker(locker: Locker, at: Location): Observable<Locker> {
        return this.http.post<Locker>(`${environment.apiUrl}/lockers`, {
            "number": locker.number, 
            "verticalPosition": locker.verticalPosition,
            "lock": locker.lock,
            "locationId": at.locationId,
            "dimensions": locker.dimensions
        });
    }

    getLockerBy(lockerId: string): Observable<Locker> {
        return this.http.get<Locker>(`${environment.apiUrl}/lockers/${lockerId}`);
    }

    putLocker(locker: Locker): Observable<Locker> {
        return this.http.put<Locker>(`${environment.apiUrl}/lockers/${locker.lockerId}`, locker);
    }

    deleteLockerBy(lockerId: string): Observable<null> {
        return this.http.delete<null>(`${environment.apiUrl}/lockers/${lockerId}`);
    }
}