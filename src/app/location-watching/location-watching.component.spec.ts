import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWatchingComponent } from './location-watching.component';

describe('LocationWatchingComponent', () => {
  let component: LocationWatchingComponent;
  let fixture: ComponentFixture<LocationWatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationWatchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationWatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
