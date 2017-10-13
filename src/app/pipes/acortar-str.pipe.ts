import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acortarStr'
})
export class AcortarStrPipe implements PipeTransform {

  transform(value: string): string {
    if  (value.length < 50)
      return value;

    let cadena = value.split("", 50).join("") + "...";
    return cadena;
  }

}
