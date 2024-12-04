export interface IJWT{
  id:string;
  email:string;
  isAdmin:boolean
}

export interface IWishList{
  product:RenderedProduct
}
export interface IWishAdd{
userId:string;
productId:string;
productType:string
}
export interface IGetRating{
  productId:string;
  categoryName:string;
}
export interface IRatingQuery{
  productId:string;
  rating:number;
  categoryName:string
}
export interface CartProducts{
  product:RenderedProduct,
  quantity:number
}

export interface CommentData{
    user:string;
    commentText:string;
    createdAt:Date
}
export interface IGetCommentQuery{
  model:string;
  productType:string
}
export interface IAddCommentQuery{
  model:string;
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
    categoryName?:string;
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

  export interface IWishListQuery{
    _id:string;
    productId:string;
    productType:string
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
    stock?:number;
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
    WiFi?:string;
    webCamera?:string;
    display?:string;
    usb:string;
  }
  export interface IToken{
    id:string;
    email:string;
    isAdmin:boolean;
  }
  export interface ICart{
    userId:string;
    productId:string;
    productType:string;
    quantity:number;
  }
export interface IWishList{
  userId:string;
  productId:string;
  productType:string;
}

export interface ICartItem{
  _id:string;
  productType:string;
productId:RenderedProduct;
quantity:number
}

export interface ICartQuery{
productId:string,
productType:string;
quantity:number;
_id:string
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
  stock?:number;
  views?:number;
  rating?:{
    average:number;
    ratingSum:number;
    totalRatings:number
  }
}

  export interface FileObject{
    uid:string;
    lastModified:number;
    lastModifiedDate:Date;
    name:string;
    size:string;
    originFileObj:File;
  }