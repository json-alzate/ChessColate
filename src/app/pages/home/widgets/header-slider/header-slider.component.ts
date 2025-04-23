import { Component, OnInit, AfterViewInit } from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-header-slider',
  templateUrl: './header-slider.component.html',
  styleUrls: ['./header-slider.component.scss'],
  imports: [],
})
export class HeaderSliderComponent  implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

}
