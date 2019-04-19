import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProgrammeComponent } from './ajout-programme.component';

describe('AjoutProgrammeComponent', () => {
  let component: AjoutProgrammeComponent;
  let fixture: ComponentFixture<AjoutProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
