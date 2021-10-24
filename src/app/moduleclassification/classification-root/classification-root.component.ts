import { Component, OnInit } from '@angular/core';
import { ClassificationtypeModel } from '../data/models/classificationtype.model';
import { ClassificationtypeService } from '../data/services/classificationtype.service';

@Component({
  selector: 'app-classification-root',
  templateUrl: './classification-root.component.html',
  styleUrls: ['./classification-root.component.scss']
})
export class ClassificationRootComponent implements OnInit {

  constructor(private service: ClassificationtypeService) { }

  ngOnInit(): void {
  }
  ClassificationClicked(){
    let classification: ClassificationtypeModel = new ClassificationtypeModel();
   this.service.refreshGrid.next(classification);
  }
}
