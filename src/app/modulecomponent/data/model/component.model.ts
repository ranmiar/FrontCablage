import { PriceModel } from "./price.model";
import { OfferModel } from "./offer.model";
import { MesurementModel } from "./mesurement.model";

export class ComponentModel {
    id?: number;
    renaultpartnumber: string;
    nissanpartnumber?: string;
    classificationType?: string;
    tta?: string;
    technicalClassification?: string;
    strategicClassification?: string;
    birthdate?: Date;
    alliancespecific?: string;
    comment?: string;
    technicalfile?: string;
    npdm? : string;
    mgv? : string;
    sharepoint? : string;
    replaceBy? : string;
    id_analog? : number;
    designation? : string;
    creationDate? : Date;
    updateAuthor? : Date;
    price? : PriceModel;
    offer? :OfferModel[];
    id_mesurementunit?: number;
    mesurement? :MesurementModel;
    id_classification?: number;
    
}