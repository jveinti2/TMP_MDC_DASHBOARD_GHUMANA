import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifierModalGeneralService {
  private eventEmitter = new EventEmitter<any>();
  constructor() { }
  get notifySaveData(): EventEmitter<any> {
    return this.eventEmitter;
  }
}
