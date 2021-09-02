import { axios } from '@/plugins/axios';
import { Log } from '~/utils';
import { SUser } from './user.schema';

export class UserGateway {
  public static async GetMe() {
    const res: SUser.GetMe.Response = (await axios.get('users/me')).data;

    if (res.error) Log.Error(res.error, false);

    return res.data;
  }

  public static async GetAll() {
    const res: SUser.GetAll.Response = (await axios.get('users')).data;

    if (res.error) Log.Error(res.error, false);

    return res.data;
  }

  public static async ToggleAdmin({ userId }: SUser.ToggleAdmin.Request) {
    const res: SUser.ToggleAdmin.Response = (
      await axios.put(`users/${userId}/admin`)
    ).data;

    if (res.error) Log.Error(res.error, false);

    return res.data;
  }

  public static async DeleteUser({ userId }: SUser.DeleteUser.Request) {
    const res: SUser.DeleteUser.Response = (
      await axios.delete(`users/${userId}`)
    ).data;

    if (res.error) Log.Error(res.error, false);

    return res.data;
  }
}
