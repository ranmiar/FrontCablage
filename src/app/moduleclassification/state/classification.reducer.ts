import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ClassificationtAutoFillModel } from "../data/models/classificationautofill.model";
import * as AppState from '../../state/app.state';
import * as ClassificationAction from '../state/classification.action';


export interface State extends AppState.State{
  classification: ClassificationState;
}

const initialState: ClassificationState = {
  showLabel: true,
  classificationautofill: [],
  selectedclassificationautofill : []
};
const getClassificationFeatureState = createFeatureSelector<ClassificationState>('classification');

export const getShowLabel = createSelector(
  getClassificationFeatureState,
  state=>state.showLabel
  );

  export const getclassificationautofill = createSelector(
    getClassificationFeatureState,
    state=>state.classificationautofill
    );
    export const getselectedclassificationautofill = createSelector(
      getClassificationFeatureState,
      state=>state.selectedclassificationautofill
      );

export interface ClassificationState{
  showLabel: boolean;
  classificationautofill: ClassificationtAutoFillModel[]; 
  selectedclassificationautofill: ClassificationtAutoFillModel[]; 
}

export const classificationReducer = createReducer<ClassificationState>(
  initialState,
on(ClassificationAction.showLabel,(state): ClassificationState =>{
   
  return{
    ...state,
      showLabel: !state.showLabel
  };
}),on(ClassificationAction.setselectedclassificationautofill,(state,action):ClassificationState=>{
  return{
    ...state,
    selectedclassificationautofill: action.classificationautofill
  }
}),on(ClassificationAction.getclassificationautofill,(state,action):ClassificationState=>{
  return{
    ...state,
    classificationautofill: action.classificationautofill
  }
}),on(ClassificationAction.initializeselectedclassificationautofill,(state):ClassificationState=>{
  return{
    ...state,
    selectedclassificationautofill : []
  }
})
  );