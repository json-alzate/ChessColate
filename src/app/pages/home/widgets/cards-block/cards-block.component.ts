import { Component, OnInit, Input, Output, EventEmitter, signal, computed  } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  id: number;
  prioridad?: number;
}

@Component({
  selector: 'app-cards-block',
  templateUrl: './cards-block.component.html',
  styleUrls: ['./cards-block.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class CardsBlockComponent  implements OnInit {

  // @Input({ required: true })
  // itemsInput = signal<Item[]>([]);

  // @Input()
  // layoutClass = signal<'layout1' | 'layout2' | 'layout3'>('layout1');

  // @Output()
  // itemClicked = new EventEmitter<Item>();

  // readonly layoutCapacidad = 8;

  // itemsVisibles = computed(() => {
  //   const items = this.itemsInput();
  //   const conPrioridad = items
  //     .filter(item => item.prioridad !== undefined)
  //     .sort((a, b) => (b.prioridad! - a.prioridad!));

  //   const sinPrioridad = items
  //     .filter(item => item.prioridad === undefined)
  //     .sort(() => Math.random() - 0.5);

  //   return [...conPrioridad, ...sinPrioridad].slice(0, this.layoutCapacidad);
  // });

  constructor() { }

  ngOnInit() {}

  seleccionar(item: Item) {
    // this.itemClicked.emit(item);
  }

}
