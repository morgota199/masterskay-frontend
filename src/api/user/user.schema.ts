import { API } from '~/types/global';
import { IUser } from './user.interface';

export namespace SUser {
  export namespace GetMe {
    export type Response = API.Response<IUser.Model>;
  }

  export namespace GetAll {
    export type Response = API.Response<IUser.Model[]>;
  }

  export namespace ToggleAdmin {
    export type Request = { userId: string };
    export type Response = API.Response<IUser.Model>;
  }

  export namespace DeleteUser {
    export type Request = { userId: string };
    export type Response = API.Response<API.Status>;
  }
}
