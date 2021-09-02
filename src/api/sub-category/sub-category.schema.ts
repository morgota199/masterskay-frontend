import { API } from '~/types/global';
import { RecursivePartial } from '~/types/utils';
import { ISubCategory } from './sub-category.interface';

export namespace SSubCategory {
  export namespace Create {
    export type Request = { name: string };
    export type Response = API.Response<ISubCategory.Model>;
  }

  export namespace GetAll {
    export type Response = API.Response<ISubCategory.Model[]>;
  }

  export namespace UpdateOneById {
    export type Request = {
      subCategoryId: string;
      params: RecursivePartial<ISubCategory.Schema>;
    };
    export type Response = API.Response<ISubCategory.Model>;
  }

  export namespace DeleteOneById {
    export type Request = { subCategoryId: string };
    export type Response = API.Response<API.Status>;
  }
}
