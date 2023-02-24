import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailsDto } from '../models/dtos/carDetailsDto';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetailsDto[], filterText:string): CarDetailsDto[] {
    filterText=filterText ? filterText.toLocaleLowerCase():"";

    return filterText
    ? value.filter(
      (b:CarDetailsDto)=>b.colorName.toLocaleLowerCase().indexOf(filterText)!==-1)  //BURAYI KONTROL ET
    :value;
  }

}
