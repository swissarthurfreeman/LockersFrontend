import { Locker } from "./locker.model";
import { Location } from "./location.model";

export class Contract {
    locker!: Locker;
    lockerId!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    phone_number!: string;
    expiration!: string;
    status!: string;
    createdAt!: string;
    updatedAt!: string;
    location!: Location;

}