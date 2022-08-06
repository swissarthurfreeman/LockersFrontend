import { Injectable } from "@angular/core";
import { UrlSegment } from "@angular/router";
import { Location } from "../model/location.model";
import { Confirmation } from "../model/confirmation.model";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Contract } from "../model/contract.model";

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

    confirmations: Confirmation[] = [];
    
    addConfirmation(conf: Confirmation) {
        this.confirmations.push(conf);
        setTimeout(() => this.confirmations.splice(0, 1), 4000);
    }

    public getPrettyExpiration(contr: Contract): string {
      moment.locale('fr');
      console.log(moment.locale());
      return moment(contr.expiration).format("LL");
  }
}