import {
  Component,
  OnInit,
  HostListener,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import { NotifierDragDropFilesService } from "./services/notifier-drag-drop-files.service";
import { DOCUMENT } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private config: { version: string };
  is_drag: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private notifier: NotifierDragDropFilesService,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.modalService.dismissAll();
      }
    });
    this.notifier.nofifyOnDragDropFile.subscribe((response: any) => {
      switch (response.type) {
        case "on_start":
          this.is_drag = response.is_drag;
          break;
        case "on_end":
          this.is_drag = response.is_drag;
          break;
      }
      this.cdr.detectChanges();
    });
  }
  @HostListener("document:dragover", ["$event"])
  @HostListener("document:dragleave", ["$event"])
  onDrag(event) {
    if (this.is_drag) {
      this.document.body.classList.add("drag-start");
      this.notifier.nofifyOnDragDropFile.emit({
        type: "on_listen",
      });
    }
    event.preventDefault();
  }
  @HostListener("document:drop", ["$event"]) onDrop(event) {
    if (this.is_drag) {
      this.notifier.nofifyOnDragDropFile.emit({
        type: "on_capture",
        files: event.dataTransfer.files,
      });
      this.document.body.classList.remove("drag-start");
    }
    event.preventDefault();
  }
}
