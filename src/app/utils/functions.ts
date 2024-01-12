import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Functions {
  _loading: string = `${environment.URL_SERVE}assets/img/loading.gif`;

  loadingAction(title = 'Cargando datos'): any {
    return swal({
      html: `<img src="${this._loading}" width="80">`,
      title: title,
      showConfirmButton: false,
      showCloseButton: false,
      showCancelButton: false,
      allowOutsideClick: false
    });
  }
  messageAlert(type, title = '', message): any {
    return swal({
      title: title,
      text: message,
      type: type,
      showConfirmButton: true,
      showCloseButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Cerrar'
    });
  }
  toFormData<T>(data_form: T): any {
    const formData = new FormData();
    for(const key of Object.keys(data_form)) {
      const value = data_form[key];
      formData.append(key, value);
    }
    return formData;
  }
  inTwoDigits(number): string {
    return (`0${number}`).slice(-2)
  }
  validateEmail(input) {
    if(input != null){
      var validRegex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
      if (input.match(validRegex)) {
        return true;
      }
    }
    return false;
  }
}
