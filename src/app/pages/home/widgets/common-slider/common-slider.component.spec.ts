import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommonSliderComponent } from './common-slider.component';

describe('CommonSliderComponent', () => {
  let component: CommonSliderComponent;
  let fixture: ComponentFixture<CommonSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
