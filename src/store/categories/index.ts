import { defineModule } from 'direct-vuex';
import { ICategory } from '~/api/category/category.interface';
import { ISubCategory } from '~/api/sub-category';

interface State {
  categories: ICategory.Model[];
  subCategories: ISubCategory.Model[];
}

export const categories = defineModule({
  namespaced: true,

  state: (): State => ({
    categories: [],
    subCategories: [],
  }),

  mutations: {
    setCategories(state: State, categories: ICategory.Model[]) {
      state.categories = categories;
    },

    setSubCategories(state: State, subCategories: ISubCategory.Model[]) {
      state.subCategories = subCategories;
    },
  },
});
