import { axios } from '@/plugins/axios';
import { Log } from '~/utils';
import { SSubCategory } from './sub-category.schema';

export class SubCategoryGateway {
  static async Create(params: SSubCategory.Create.Request) {
    const res: SSubCategory.Create.Response = (
      await axios.post('sub-categories', params)
    ).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }

  static async GetAll() {
    const res: SSubCategory.GetAll.Response = (
      await axios.get('sub-categories')
    ).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }

  static async UpdateOneById({
    subCategoryId,
    params,
  }: SSubCategory.UpdateOneById.Request) {
    const res: SSubCategory.UpdateOneById.Response = (
      await axios.patch(`sub-categories/${subCategoryId}`, params)
    ).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }

  static async DeleteOneById({
    subCategoryId,
  }: SSubCategory.DeleteOneById.Request) {
    const res: SSubCategory.DeleteOneById.Response = (
      await axios.delete(`sub-categories/${subCategoryId}`)
    ).data;

    if (res.error) Log.Error(res.error, true);

    return res.data;
  }
}
