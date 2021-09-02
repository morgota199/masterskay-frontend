import { API } from '~/types/global';
import { RecursivePartial } from '~/types/utils';
import { ICategory } from './category.interface';

export namespace SCategory {
  export namespace Create {
    export type Request = { name: string };
    export type Response = API.Response<ICategory.Model>;
  }

  export namespace GetAll {
    export type Response = API.Response<ICategory.Model[]>;
  }

  export namespace UpdateOneById {
    export type Request = {
      categoryId: string;
      params: RecursivePartial<ICategory.Schema>;
    };
    export type Response = API.Response<ICategory.Model>;
  }

  export namespace DeleteOneById {
    export type Request = { categoryId: string };
    export type Response = API.Response<API.Status>;
  }
}
