import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailsDto } from '../models/dtos/carDetailsDto';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDetailsDto[], filterText:string): CarDetailsDto[] {
    filterText=filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((p:CarDetailsDto)=>p.modelName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
