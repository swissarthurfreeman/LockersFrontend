import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { Contract } from "../model/contract.model";
import { Location } from "../model/location.model";
import { Locker } from "../model/locker.model";

@Injectable({providedIn: 'root'})   // wtf does this line do ?
export class ContractService {
    constructor(private http: HttpClient) { }
    // /contracts?site=Sciences&name=EPA
    getContractsOf(location: Location): Observable<Contract[]> {
        return this.http.get<Contract[]>(`${environment.apiUrl}/contracts?site=${location.site}&name=${location.name}`);
    }

    postContract(contract: Contract): Observable<Locker> {
        return this.http.post<Locker>(`${environment.apiUrl}/contracts`, {
            "lockerId": contract.locker.lockerId, 
            "firstname": contract.firstname,
            "lastname": contract.lastname,
            "email": contract.email,
            "phone_number": contract.phone_number
        });
    }

    getContractBy(lockerId: string): Observable<Contract> {
        return this.http.get<Contract>(`${environment.apiUrl}/contracts/${lockerId}`);
    }
}