import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationtypeAddComponent } from './classificationtype-add.component';

describe('ClassificationtypeAddComponent', () => {
  let component: ClassificationtypeAddComponent;
  let fixture: ComponentFixture<ClassificationtypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationtypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationtypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
