import { HarnessFactoryModel } from "./harnessFactory.model";
import { HarnessMakerModel } from "./harnessMaker.model";
import { PriceModel } from "./price.model";
import { ProgrammeModel } from "./programme.model";

export class OfferModel{
    id_offer: number;
    designation: string;
    //unitprice: number;
    validitydate: Date;
    economicareacode: string;
    programme: ProgrammeModel;
    harnessFactory?: HarnessFactoryModel;
    harnessMaker?: HarnessMakerModel;
    price? : PriceModel;
    dateofrecept? :Date;
    factoryCountry: string;
}