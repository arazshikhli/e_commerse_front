export interface IComment {
  userId: string; // Или другой идентификатор пользователя
  text: string;
  createdAt: Date;
}

// Интерфейс для общей структуры рейтинга
export interface IRating {
  average: number;
  totalRatings: number;
  ratingsSum: number;
}

// Интерфейс для деталей продукта
export interface IProductDetails {
  // Этот интерфейс может быть пустым или содержать общие свойства, если они есть
}

// Интерфейсы для специфичных типов продуктов
export interface ITVDetails extends IProductDetails {
  type:'tv';
  screenSize: string;
  resolution: string;
  smartTV: boolean;
}

export interface ILaptopDetails extends IProductDetails {
  type:'laptop';
  screenSize: string;
  processor: string;
  ram: string;
  storage: string;
}

export interface IMobileDetails extends IProductDetails {
  type:'mobile';
  screenSize: string;
  battery: string;
  camera: string;
}

// Интерфейс для общего продукта
export interface IProduct {
  _id: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  views: number;
  purchases: number;
  rating: IRating;
  comments: IComment[];
  productDetails: ITVDetails | ILaptopDetails | IMobileDetails; // Тип для productDetails, можно использовать общее поле или конкретные
}

export interface IProductResponse {
  products: IProduct[];
  totalPages: number;
  currentPage: number;
}