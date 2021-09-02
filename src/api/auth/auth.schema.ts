import { API } from '~/types/global';
import { IUser } from '../user';

export namespace SAuth {
  export namespace SignUp {
    export type Request = { email: string; password: string };
    export type Response = API.Response<{
      accessToken: string;
      user: IUser.Model;
    }>;
  }

  export namespace SignIn {
    export type Request = { email: string; password: string };
    export type Response = API.Response<{
      accessToken: string;
      user: IUser.Model;
    }>;
  }

  export namespace LinkRestorePassword {
    export type Request = { email: string };
    export type Response = API.Response<{ token: string }>;
  }

  export namespace RestorePassword {
    export type Request = {
      token: string;
      resetCode: number;
      password: string;
    };

    export type Response = API.Response<API.Status>;
  }
}
