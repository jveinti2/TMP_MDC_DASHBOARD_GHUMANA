import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
  selector: "app-cache",
  templateUrl: "./cache.component.html",
})
export class CacheComponent implements OnInit {
  message: string = "Hello World!";

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {}

  sendMessage() {
    this.messageEvent.emit(this.message);
  }

  ngOnInit() {}
}
