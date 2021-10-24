import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationautofillAddComponent } from './classificationautofill-add.component';

describe('ClassificationautofillAddComponent', () => {
  let component: ClassificationautofillAddComponent;
  let fixture: ComponentFixture<ClassificationautofillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationautofillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationautofillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
