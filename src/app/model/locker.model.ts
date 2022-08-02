import { Location } from "./location.model";

export class Locker {
    constructor() { this.location = new Location(); }
    lockerId!: string;
    number!: number;
    verticalPosition!: string;
    lock!: boolean;
    dimensions!: string;
    location!: Location;
    OutOfService!: boolean;
    OutOfServiceReason!: string;
}