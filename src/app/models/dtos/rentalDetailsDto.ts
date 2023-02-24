export interface RentalDetailDto{
    rentalId:number;
    carId:number;
    brandName:string;
    colorName:string;
    modelName:string; 
    customerId:number;
    firstName:string;
    lastName:string;
    companyName:string;
    rentDate:Date;
    returnDate:Date;
}