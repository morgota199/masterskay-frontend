export namespace ICategory {
  export interface Model extends Schema {
    _id: string;
    countInstruments: number;
    createAt: number;
    __v: number;
  }

  export interface Schema {
    name: string;
    subCategories: string[];
  }
}
