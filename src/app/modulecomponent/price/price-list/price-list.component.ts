import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentModel } from '../../data/model/component.model';
import { PriceModel } from '../../data/model/price.model';
import { ComponentService } from '../../data/service/component.service';
import { PriceService } from '../../data/service/price.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  prices: PriceModel[] = [];
  prices_backup: PriceModel[] = [];
  pricesselectedchild: PriceModel[];
  selectedType: PriceModel;
  filter: string;
  isLoading:boolean;
  selectedPrice: PriceModel;
  compoentlist: ComponentModel[];

  constructor(private service: PriceService, private componentService: ComponentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getPrices().subscribe((cm)=>{
    this.prices = cm;
    this.prices_backup = cm;
    },(err)=>{
      alert('error when trying to get prices, please retry later !');
      console.error(err);
    });
    this.componentService.getComponents().subscribe((cl)=>{
      this.compoentlist = cl;
    });
  }

  ComponentChanged(data: any){
    if(data && data.value && data.value.id>0)
    {
     this.service.getPricesByComponent(data.value.id).subscribe((cm)=>{
       this.prices = cm;
       },(err)=>{
         alert('error when trying to get components, please retry later !');
         console.error(err);
       });
    }
    else{
     this.prices = this.prices_backup;
    }
 
   
   }

   handleChildButtonClick(value:any) {
    if(value && value.length)
    {
      this.pricesselectedchild = value;
   
    }
    else{
      this.pricesselectedchild = [];
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    let filterd_prices = this.prices_backup;
    if(this.selectedType)
    { 
     // filtred_components = this.components_backup.filter(cl=>cl.classificationTypeDto.id === this.selectedType.id)
    } 
    if(filterValue)
    {
      filterd_prices = filterd_prices.filter(cl=>cl.sizeExtensionMin !=null && cl.sizeExtensionMax.toString().toLocaleLowerCase().includes(filterValue) 
      ||(cl.unitprice!=null && cl.unitprice.toString().toLocaleLowerCase().includes(filterValue) )
      || cl.sizeExtensionMax!=null && cl.sizeExtensionMax.toString().toLocaleLowerCase().includes(filterValue) 
   
      );
    }   
   

    this.prices = filterd_prices.slice(0);
   
  }

}
