import { ClassificationtypeModel } from "./classificationtype.model";

export class ClassificationtModel {
    id: number;
    designation: string;
    idParent: number;
    level: number;
    parent_designation: string;
    classificationTypeDto: ClassificationtypeModel;
    }