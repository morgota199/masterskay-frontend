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
      :row-data="subCategories"
      :row-height="70"
      :lock-position="true"
      :suppress-movable="true"
      :suppress-row-click-selection="true"
      :suppress-drag-leave-hides-columns="true"
      :overlay-no-rows-template="'<span />'"
    />

    <Edit
      v-model="editSubCategory.visible"
      :sub-category="editSubCategory.data"
      @cancel="onEditCancel"
    />
    <Delete
      v-model="deleteSubCategory.visible"
      :sub-category="deleteSubCategory.data"
      @cancel="onDeleteCancel"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { TableData } from './data';
  import { store } from '~/store';
  import { ISubCategory } from '~/api/sub-category';
  import { GridOptions } from 'ag-grid-community';
  import Delete from '../Modal/Delete.vue';
  import Edit from '../Modal/Edit.vue';

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
      onDeleteShow(subCategory: ISubCategory.Model) {
        this.deleteSubCategory.visible = true;
        this.deleteSubCategory.data = subCategory;
      },

      onDeleteCancel() {
        this.deleteSubCategory.visible = false;
        this.deleteSubCategory.data = null;
      },

      onEditShow(subCategory: ISubCategory.Model) {
        this.editSubCategory.visible = true;
        this.editSubCategory.data = subCategory;
      },

      onEditCancel() {
        this.editSubCategory.visible = false;
        this.editSubCategory.data = null;
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
