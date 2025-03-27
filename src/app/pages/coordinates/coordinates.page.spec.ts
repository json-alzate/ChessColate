import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordinatesPage } from './coordinates.page';

describe('CoordinatesPage', () => {
  let component: CoordinatesPage;
  let fixture: ComponentFixture<CoordinatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
