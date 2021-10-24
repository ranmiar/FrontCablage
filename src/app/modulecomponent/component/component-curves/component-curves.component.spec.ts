import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCurvesComponent } from './component-curves.component';

describe('ComponentCurvesComponent', () => {
  let component: ComponentCurvesComponent;
  let fixture: ComponentFixture<ComponentCurvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentCurvesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCurvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
