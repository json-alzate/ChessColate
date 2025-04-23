import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardsBlockComponent } from './cards-block.component';

describe('CardsBlockComponent', () => {
  let component: CardsBlockComponent;
  let fixture: ComponentFixture<CardsBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardsBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
