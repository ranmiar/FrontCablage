import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationRootComponent } from './classification-root.component';

describe('ClassificationRootComponent', () => {
  let component: ClassificationRootComponent;
  let fixture: ComponentFixture<ClassificationRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
