import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursTestComponent } from './cours-test.component';

describe('CoursTestComponent', () => {
  let component: CoursTestComponent;
  let fixture: ComponentFixture<CoursTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
