import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import localeES from "@angular/common/locales/es-CO";
import { NgxSelectModule, INgxSelectOptions } from "ngx-select-ex";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InicioSesionComponent } from "./pages/inicio-sesion/inicio-sesion.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { TableSortService } from "./services/table-sort.service";
import { OnlyInputNumber } from "./directives/only-input-number";
import { MenuComponent } from "./components/menu/menu.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxImageCompressService } from "ngx-image-compress";
import { DateTimeComponent } from "./components/inputs/date-time/date-time.component";
import { CacheComponent } from "./components/cache/cache.component";
import { AplicacionComponent } from "./pages/aplicacion-component/aplicacion-component";

registerLocaleData(localeES, "es-CO");

const CustomSelectOptions: INgxSelectOptions = {
  optionValueField: "id",
  optionTextField: "name",
  keepSelectedItems: false,
};

@NgModule({
  declarations: [
    AplicacionComponent,
    AppComponent,
    TableSortService,
    OnlyInputNumber,
    InicioSesionComponent,
    InicioComponent,
    MenuComponent,
    DateTimeComponent,
    CacheComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "es-CO",
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService,
    NgxImageCompressService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
