import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentrootComponent } from './componentroot.component';

describe('ComponentrootComponent', () => {
  let component: ComponentrootComponent;
  let fixture: ComponentFixture<ComponentrootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentrootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentrootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
