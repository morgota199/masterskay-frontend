import { axios } from '@/plugins/axios';
import { Log } from '~/utils';
import { SCategory } from './category.schema';

export class CategoryGateway {
  static async Create(params: SCategory.Create.Request) {
    const res: SCategory.Create.Response = (
      await axios.post('categories', params)
    ).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }

  static async GetAll() {
    const res: SCategory.GetAll.Response = (await axios.get('categories')).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }

  static async UpdateOneById({
    categoryId,
    params,
  }: SCategory.UpdateOneById.Request) {
    const res: SCategory.UpdateOneById.Response = (
      await axios.patch(`categories/${categoryId}`, params)
    ).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }

  static async DeleteOneById({ categoryId }: SCategory.DeleteOneById.Request) {
    const res: SCategory.DeleteOneById.Response = (
      await axios.delete(`categories/${categoryId}`)
    ).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }
}
