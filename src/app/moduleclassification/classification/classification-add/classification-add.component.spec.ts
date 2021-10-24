import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationAddComponent } from './classification-add.component';

describe('ClassificationAddComponent', () => {
  let component: ClassificationAddComponent;
  let fixture: ComponentFixture<ClassificationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
