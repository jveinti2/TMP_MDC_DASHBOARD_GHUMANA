import { SortDirection } from '../utils/constants';

export interface ISortEvent {
  column: string;
  direction: SortDirection;
}
