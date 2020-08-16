import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModallComponent } from './my-modal.component';

describe('MyModallComponent', () => {
  let component: MyModallComponent;
  let fixture: ComponentFixture<MyModallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyModallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyModallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
