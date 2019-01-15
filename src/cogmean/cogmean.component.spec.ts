import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CogmeanComponent } from './cogmean.component';

describe('CogmeanComponent', () => {
  let component: CogmeanComponent;
  let fixture: ComponentFixture<CogmeanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CogmeanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CogmeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});