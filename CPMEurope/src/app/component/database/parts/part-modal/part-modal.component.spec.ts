import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartModalComponent } from './part-modal.component';

describe('PartModalComponent', () => {
  let component: PartModalComponent;
  let fixture: ComponentFixture<PartModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
