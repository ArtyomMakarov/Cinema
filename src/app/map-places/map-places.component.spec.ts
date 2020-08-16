import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlacesComponent } from './map-places.component';

describe('MapPlacesComponent', () => {
  let component: MapPlacesComponent;
  let fixture: ComponentFixture<MapPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
