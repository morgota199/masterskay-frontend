<template>
  <div class="categories-table table">
    <ag-grid-vue
      class="ag-theme-alpine"
      dom-layout="autoHeight"
      multi-sort-key="ctrl"
      pagination
      pagination-page-size="10"
      :grid-options="gridOptions"
      :default-col-def="defaultColDef"
      :column-defs="columnDefs"
      :row-data="categories"
      :row-height="70"
      :lock-position="true"
      :suppress-movable="true"
      :suppress-row-click-selection="true"
      :suppress-drag-leave-hides-columns="true"
      :overlay-no-rows-template="'<span />'"
    />

    <Edit
      v-if="editCategory.data"
      v-model="editCategory.visible"
      :category="editCategory.data"
      :subSetegories="subCategories"
      @cancel="onEditCancel"
    />
    <Delete
      v-if="deleteCategory.data"
      v-model="deleteCategory.visible"
      :category="deleteCategory.data"
      @cancel="onDeleteCancel"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { TableData } from './data';
  import { store } from '~/store';
  import { ICategory } from '~/api/category/category.interface';
  import { GridOptions } from 'ag-grid-community';
  import Delete from '../Modal/Delete.vue';
  import Edit from '../Modal/Edit.vue';
  import { ISubCategory } from '~/api/sub-category';

  export default Vue.extend({
    components: {
      Edit,
      Delete,
    },

    props: {
      search: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        ...TableData,

        gridOptions: {
          rowSelection: 'single',
          suppressMenuHide: true,
          enableCellTextSelection: true,
          suppressRowClickSelection: false,
          context: {
            componentParent: this,
          },
        } as GridOptions,
      };
    },

    computed: {
      categories(): ICategory.Model[] {
        return store.state.categories.categories;
      },

      subCategories(): ISubCategory.Model[] {
        return store.state.categories.subCategories;
      },
    },

    watch: {
      search() {
        if (this.gridOptions.api) {
          this.gridOptions.api.setQuickFilter(this.search);
        }
      },
    },

    methods: {
      onEditShow(category: ICategory.Model) {
        this.editCategory.visible = true;
        this.editCategory.data = category;
      },

      onEditCancel() {
        this.editCategory.visible = false;
        this.editCategory.data = null;
      },

      onDeleteShow(category: ICategory.Model) {
        this.deleteCategory.visible = true;
        this.deleteCategory.data = category;
      },

      onDeleteCancel() {
        this.deleteCategory.visible = false;
        this.deleteCategory.data = null;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .categories-table {
    width: 100%;
    margin-top: 20px;
  }

  .ag-theme-alpine::v-deep {
    .ag-cell,
    .ag-header-cell {
      padding: 0 20px !important;
    }

    .ag-header-cell[col-id='action'] {
      .ag-header-cell-label {
        display: flex;
        justify-content: center;
      }
    }

    .ag-cell[col-id='email'] {
      .ag-cell-wrapper {
        width: 100%;
      }
    }
  }
</style>
