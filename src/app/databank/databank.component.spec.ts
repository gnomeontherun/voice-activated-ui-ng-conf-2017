import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabankComponent } from './databank.component';

describe('DatabankComponent', () => {
  let component: DatabankComponent;
  let fixture: ComponentFixture<DatabankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
