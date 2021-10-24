import { createAction, props } from "@ngrx/store";
import { ClassificationtAutoFillModel } from "../data/models/classificationautofill.model";


export const showLabel = createAction(
    '[Classification] Toggle Label'
);

export const getclassificationautofill = createAction(
    '[Classification] Get Autofill',props<{classificationautofill: ClassificationtAutoFillModel[]}>()
);

export const setselectedclassificationautofill = createAction(
    '[Classification] Get Autofillselected',props<{classificationautofill: ClassificationtAutoFillModel[]}>()
);

export const initializeselectedclassificationautofill = createAction(
    '[Classification] Initialize Autofillselected'
);