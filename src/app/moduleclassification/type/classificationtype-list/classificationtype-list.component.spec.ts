import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationtypeListComponent } from './classificationtype-list.component';

describe('ClassificationtypeListComponent', () => {
  let component: ClassificationtypeListComponent;
  let fixture: ComponentFixture<ClassificationtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationtypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
