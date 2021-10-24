import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, mergeMap, tap, map } from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ComponentModel } from '../../data/model/component.model';
import { ComponentService } from '../../data/service/component.service';

@Component({
  selector: 'component-input',
  templateUrl: './component-input.component.html'
})
export class componentInput implements  OnInit {
  @Input() componentinputForm: FormGroup;
  filteredComponents: Observable<ComponentModel[]>;
  @Output() optionSelected = new EventEmitter();
  componentdata: Observable<ComponentModel[]>;

  components: ComponentModel[] = [
  //   {renaultpartnumber:"243427Y009"},
  // {renaultpartnumber:"280884BA0A"},
  // {renaultpartnumber:"242970378R"}
];

  constructor(private fb: FormBuilder, private componentService: ComponentService) {
  }

  ngOnInit() {   

    this.componentService.getComponents().subscribe((cm) => {
      this.components = cm;
      this.componentdata = of(this.components);
    }, (err) => {
      alert('error when trying to get components, please retry later !');
      console.error(err);
    });

      //this.componentdata = of(this.components);
      this.filteredComponents = this.componentinputForm.get("component").valueChanges.pipe(
              tap(val => console.log('inside valueChanges Observable, val is: ', val)),
              debounceTime(200))
              .pipe(mergeMap(val => this.filter(val)));
  }

  private filter(value: string | ComponentModel): Observable<ComponentModel[]> {
    const val = (typeof value === 'string') ? value : value.renaultpartnumber;
    console.log('inside filter, value is: ', value);
    if (val) {
        return this.componentdata.pipe(map((cos: ComponentModel[]) => {
            return cos.filter((co: ComponentModel) => {
                return (co.renaultpartnumber.toLowerCase().search((typeof val === 'string') ? val.toLowerCase() : (<ComponentModel> val).renaultpartnumber.toLowerCase()) !== -1)
            });
        }));
    } else {
        return this.componentdata;
    }
   
  }
  

  onSelectionChanged(event: any) {
    console.log('event: option selected is ', event);
     this.optionSelected.emit(event);
  }

  displayCo(component?: string): string {
    console.log(component)
      return component ? component : '';
  }

}
