export class Confirmation {
    constructor(message: string, type: string, button?: string) {
        this.message = message;
        this.type = type;
        this.button = button!;
    }
    
    message!: string;
    type!: string;
    button!: string;
}