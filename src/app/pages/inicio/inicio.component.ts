import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.styl"],
})
export class InicioComponent implements OnInit {
  lista_opciones: any[] = [
    {
      name: "Lista de aplicaciones",
      route: "/aplicacion",
      icon: "fas fa-id-card-alt",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
