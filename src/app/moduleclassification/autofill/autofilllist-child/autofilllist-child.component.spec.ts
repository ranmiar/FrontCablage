import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofilllistChildComponent } from './autofilllist-child.component';

describe('AutofilllistChildComponent', () => {
  let component: AutofilllistChildComponent;
  let fixture: ComponentFixture<AutofilllistChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutofilllistChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutofilllistChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
