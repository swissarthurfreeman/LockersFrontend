import { Injectable } from "@angular/core";
import { UrlSegment } from "@angular/router";
import { Location } from "../model/location.model";
import { Confirmation } from "../model/confirmation.model";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Contract } from "../model/contract.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StateService {

    firstname: string = 'Jane';
    lastname: string = 'Doe';
    group: string = 'user';
    email: string = 'jane@doe.co';

    constructor(private http: HttpClient) {}

    getCredentials(): Observable<any> { return this.http.get<any>(`${environment.apiUrl}/whoami`) };

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

    confirmations: Confirmation[] = [];
    
    role!: string;

    addConfirmation(conf: Confirmation) {
        this.confirmations.push(conf);
        setTimeout(() => this.confirmations.splice(0, 1), 4000);
    }

    public getPrettyExpiration(contr: Contract): string {
      moment.locale('fr');
      return moment(contr.expiration).format("LL");
    }


    public contractExpirationDate: string = '-05-15';
    public contractRenewalDeadline: string = '-06-30';

    public getExpirationDate(now: Date = new Date()): string {
        const contractExpirationDate = new Date((now.getFullYear()).toString() + this.contractExpirationDate);
        const contractRenewalDeadline = new Date((now.getFullYear()).toString() + this.contractRenewalDeadline);
        moment.locale('fr');
        if(contractRenewalDeadline <= now || 
            (contractExpirationDate <= now && now <= contractRenewalDeadline)) {
            const nextYear = now.getFullYear() + 1;
            
            return moment(new Date(nextYear.toString() + this.contractExpirationDate)).format("LL");
        } else {
            // => now < contractExpirationDate
            const currYear = now.getFullYear();
            return moment(new Date(currYear.toString() + this.contractExpirationDate)).format("LL");
        }
    }

    public getRenewalDeadline(now: Date = new Date()): string {
        moment.locale('fr');
        const currYear = now.getFullYear();
        return moment(new Date(currYear.toString() + this.contractRenewalDeadline)).format("LL");
    }

    public getNow() {
        moment.locale('fr');
        return moment(new Date()).format("LL");
    }
}