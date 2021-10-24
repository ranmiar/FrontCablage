import { PointModel } from "./point.model";

export class ComponentcurvesModel {
    id?: number;
    designation : string;
    id_analog : number;
    dateofrecept : [Date];
    renaultpartnumber : string;
    unitprice : [number];
    harnessMaker : string;
    harnessMakerColor : string;
    programme : string;
    point: [PointModel];
}