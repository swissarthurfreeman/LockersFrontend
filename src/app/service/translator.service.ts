import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    dico: {[key: string]: string} = { 
        'Breached': 'Rupture de Contrat', 
        'Occupied': 'Occupé', 
        'NonRenewed': 'Non Renouvelé', 
        'OutOfService': 'Hors-Service', 
        'Free': 'Libre',
        'true': 'oui',
        'false': 'non'
    };

    translate(en: string): string | undefined {
        return this.dico[en];
    }
}