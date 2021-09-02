import { ICategory } from '../category';
import { ISubCategory } from '../sub-category';

export namespace IInstruments {
  export interface Schema {
    name: string;
    price: number;
    images: string[];
    materials: string[];
    categories: string[];
    subCategories: string[];
    description: string;
    createAt: number;
  }

  export interface Join {
    _id: string;
    name: string;
    price: number;
    images: string[];
    materials: string[];
    description: string;
    categories: ICategory.Model[];
    subCategories: ISubCategory.Model[];
    createAt: number;
    __v: number;
  }

  export interface Model extends Schema {
    _id: string;
    __v: number;
  }
}
