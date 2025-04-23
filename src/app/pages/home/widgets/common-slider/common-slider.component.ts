import { Component, OnInit, AfterViewInit } from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);


@Component({
  selector: 'app-common-slider',
  templateUrl: './common-slider.component.html',
  styleUrls: ['./common-slider.component.scss'],
  standalone: true,
})
export class CommonSliderComponent  implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    new Swiper('.swiper-common-slider', {
      slidesPerView: 3,
      spaceBetween: 10,
      navigation: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

}
