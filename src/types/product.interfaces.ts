
export interface IModelAttribute {
    attributeName: string;
    type: string;
  }
  
  export interface IModel {
    categoryName: string;
    attributes: IModelAttribute[];
  }