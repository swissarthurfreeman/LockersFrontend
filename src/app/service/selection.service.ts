import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { Location } from "../model/location.model";
import { Locker } from "../model/locker.model";

@Injectable({providedIn: 'root'})   // makes this class a singleton and makes visibility app-wide.
export class SelectionService {
    constructor() {}
    locations!: Location[];
    statuses: string[] = ['Rupture de Contract', 'Occupé', 'Hors Service', 'Libre'];
}