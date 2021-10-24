import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationautofillListComponent } from './classificationautofill-list.component';

describe('ClassificationautofillListComponent', () => {
  let component: ClassificationautofillListComponent;
  let fixture: ComponentFixture<ClassificationautofillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationautofillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationautofillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
