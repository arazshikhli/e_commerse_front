

export interface CommentData{
    model:string;
    user:string;
    commentText:string;
    productType:string
}
export interface IMobile {
    brand: string;
    model: string;
    price: number;
    description: string;
    screenSize: string;
    ram: string;
    processor: string;
    storage: string;
    imageURL: string;
    stock?: number;
    categoryName:string;
    _di:string;
    battery:string;
    operatingSystem:string;

    displayType:string;
    batteryCapacity:string;
    weight:string;
    network:string
  }
  
  export interface ILaptop {
    brand: string;
    model: string;
    price: number;
    description: string;
    screenSize: string;
    ram: string;
    processor: string;
    storage: string;
    graphicsCard: string;
    imageURL: string;
    stock?: number;
    categoryName?:string
    comments?:[],
    _di:string
  }
  
  export type Product = IMobile | ILaptop;
  
  interface ProductsProps {
    allProducts: Product[];
  }
  export interface ICartItem{
    _id:string;
    productType:string;
  productId:RenderedProduct;
  quantity:number
  }
  
  export interface ICartQuery{
  user:string,
  _id:string;
  items:ICartItem[]
  }


export interface CommonType {
    brand: string;
    model: string;
    price: number;
    description: string;
    screenSize: string;
    categoryName: string;
    images: FileObject[];
    _id?: string;
    comments?: [];
    ram?: string;
    processor?: string;
    storage?: string;
    graphicsCard?: string;
    resolution?: string;
    smartTV?: string;
    battery?:string;
    operatingSystem?:string;
    displayType?:string;
    batteryCapacity?:string;
    weight?:string;
    network?:string;
  }
  export interface ICart{
    userId:string;
    productId:string;
    productType:string;
    quantity:number;
  }


export interface ICartItem{
  _id:string;
  productType:string;
productId:RenderedProduct;
quantity:number
}

export interface ICartQuery{
user:string,
_id:string;
items:ICartItem[]
}
export interface RenderedProduct{
  brand: string;
  model: string;
  price: number;
  description: string;
  screenSize: string;
  categoryName:string;
  imageURL:string[];
  _id?:string;
  comments?:[];  
  ram?: string;
  processor?: string;
  storage?: string;
  graphicsCard?: string;
  resolution?: string;
  smartTV?:string;
  battery?:string;
  operatingSystem?:string;
  displayType?:string;
  batteryCapacity?:string;
  weight?:string;
  network?:string;
}

  export interface FileObject{
    uid:string;
    lastModified:number;
    lastModifiedDate:Date;
    name:string;
    size:string;
    originFileObj:File;
  }