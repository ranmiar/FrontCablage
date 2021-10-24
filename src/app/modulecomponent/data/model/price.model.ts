import { ISO3166CountryModel } from "./ISO3166Country.model";
import { Iso4712CurrencyModel } from "./Iso4712Currency.model";
import { PriceTypeModel } from "./priceType.model";
import { WCOHSCutomCodesModel } from "./WCOHSCutomCodes.model";
import { IncotermModel } from "./incoterm.model";
import { AuthorModel } from "./author.model";

export class PriceModel {
    id: number;
    idComponent: number;
    sizeExtensionMin: number;
    sizeExtensionMax: number;
    validitydate: Date;
    tieronepn: string;
    tiertwopn: string;
    harnessNumber: string;
    pricelinecomment: string;
    tier1pn: string;
    tier2pn: string;
    updatepublicprice: boolean;
    manufacuringCountry: ISO3166CountryModel;
    purchasingCountry : ISO3166CountryModel;
    destinationCountry: ISO3166CountryModel;
    currency: Iso4712CurrencyModel;
    priceType : PriceTypeModel;
    wCOHSCutomCodes: WCOHSCutomCodesModel;
    customrate: number;
    //purchasingcountryname: string;
    //iso4712alpha3codecurrency: string;
    //wcohscustomcode : string;
    incotermcode?: IncotermModel;
    unitprice: number;
    proportionalprice:number;
    creationdateprice: Date;
    updatedateprice: Date;
    priceUpdateAuthor : AuthorModel;
    collector: AuthorModel;
    
    id_price: number;
    dateofrecept: Date;
}