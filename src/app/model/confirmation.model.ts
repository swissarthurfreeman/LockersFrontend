export class Confirmation {
    constructor(message: string, type: string) {
        this.message = message;
        this.type = type;
    }
    message!: string;
    type!: string;
}