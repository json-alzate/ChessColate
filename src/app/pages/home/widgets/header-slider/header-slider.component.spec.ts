import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderSliderComponent } from './header-slider.component';

describe('HeaderSliderComponent', () => {
  let component: HeaderSliderComponent;
  let fixture: ComponentFixture<HeaderSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HeaderSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
