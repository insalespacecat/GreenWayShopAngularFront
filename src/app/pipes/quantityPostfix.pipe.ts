import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantityPostfix'
})
export class QuantityPostfixPipe implements PipeTransform {
  transform(value: number, quantityName: string) {
    return value.toString() + quantityName;
  }
}


