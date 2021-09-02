import { SAuth } from './auth.schema';
import { axios } from '@/plugins/axios';
import { Log } from '~/utils';
import { store } from '@/store';

export class AuthGateway {
  public static async SignUp(params: SAuth.SignUp.Request) {
    const res: SAuth.SignUp.Response = (
      await axios.post('auth/sign-up', params)
    ).data;

    if (res.error) {
      store.commit.auth.setNotification(res.error.message);

      Log.Error(res.error, true);
    }

    return res.data;
  }

  public static async SignIn(params: SAuth.SignIn.Request) {
    const res: SAuth.SignIn.Response = (
      await axios.post('auth/sign-in', params)
    ).data;

    if (res.error) {
      store.commit.auth.setNotification(res.error.message);

      Log.Error(res.error, true);
    }

    return res.data;
  }

  public static async LinkRestorePassword(
    params: SAuth.LinkRestorePassword.Request,
  ) {
    const res: SAuth.LinkRestorePassword.Response = (
      await axios.post('auth/reset-password-mail', params)
    ).data;

    if (res.error) {
      Log.Error(res.error, true);
    }

    return res.data;
  }

  public static async RestorePassword(params: SAuth.RestorePassword.Request) {
    const res: SAuth.RestorePassword.Response = (
      await axios.post('auth/reset-password', params)
    ).data;

    if (res.error) {
      Log.Error(res.error, true);
    }

    return res.data;
  }
}
