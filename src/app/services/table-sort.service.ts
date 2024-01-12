import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { SortDirection, rotate } from '../utils/constants';
import { ISortEvent } from '../interfaces/i-sort-event';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class TableSortService {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<ISortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({
      column: this.sortable,
      direction: this.direction
    });
  }

}
