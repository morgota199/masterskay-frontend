<template>
  <div class="categories">
    <Heading to="/">
      <template #title> Categories </template>

      <template #tabs>
        <Tabs :tabs="tabs" />
      </template>
    </Heading>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Categories, SubCategories } from '@/components/pages';
  import { store } from '~/store';
  import { CategoryGateway } from '~/api/category';
  import { Heading, Tabs } from '@/components/ui';
  import { SubCategoryGateway } from '~/api/sub-category';

  export default Vue.extend({
    components: {
      Tabs,
      Heading,
      Categories,
    },

    async asyncData() {
      const [categories, subCategories] = await Promise.all([
        CategoryGateway.GetAll(),
        SubCategoryGateway.GetAll(),
      ]);

      store.commit.categories.setCategories(categories);
      store.commit.categories.setSubCategories(subCategories);
    },

    data: () => ({
      tabs: [
        {
          title: 'Categories',
          icon: 'categories',
          component: Categories,
        },
        {
          title: 'Sub Categories',
          icon: 'sub-category',
          component: SubCategories,
        },
      ],
    }),
  });
</script>

<style lang="scss" scoped>
  .categories {
    position: relative;
    width: 100%;
  }
</style>
