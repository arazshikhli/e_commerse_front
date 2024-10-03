
export interface IModelAttribute {
    attributeName: string;
    type: string;
  }
  
  export interface IModel {
    categoryName: string;
    attributes: IModelAttribute[];
  }
export interface CommonType{
  brand: string;
  model: string;
  price: number;
  description: string;
  screenSize: string;
  categoryName:string;
  imageFile:FileList|null;
  _id?:string;
  comments?:[];  
  ram?: string;
  processor?: string;
  storage?: string;
  graphicsCard?: string;
  resolution?: string;
  smartTV?:string;

}
  export interface IMobile extends CommonType {
    ram: string;
    processor: string;
    storage: string;
  }
  
 export  interface ILaptop extends CommonType {
    ram: string;
    processor: string;
    storage: string;
    graphicsCard: string;

  }
  export  interface ITV extends CommonType {  
    resolution: string;
    smartTV:string;
  }

 export type Product = IMobile | ILaptop|ITV;
  
 export interface ProductProps {
    product: Product;
  }

  export interface FileObject{
    uid:string;
    lastModified:number;
    lastModifiedDate:Date;
    name:string;
    size:string;
    originFileObj:File;
  }