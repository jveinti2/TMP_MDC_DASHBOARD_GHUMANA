import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifierDragDropFilesService {
  private eventEmitter = new EventEmitter<any>();
  constructor() { }
  get nofifyOnDragDropFile(): EventEmitter<any> {
    return this.eventEmitter;
  }
}
