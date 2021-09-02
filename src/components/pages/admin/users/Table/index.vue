<template>
  <div class="users-table table">
    <ag-grid-vue
      class="ag-theme-alpine"
      dom-layout="autoHeight"
      multi-sort-key="ctrl"
      pagination
      pagination-page-size="10"
      :grid-options="gridOptions"
      :default-col-def="defaultColDef"
      :column-defs="columnDefs"
      :row-data="users"
      :row-height="70"
      :lock-position="true"
      :suppress-movable="true"
      :suppress-row-click-selection="true"
      :suppress-drag-leave-hides-columns="true"
      :overlay-no-rows-template="'<span />'"
    />

    <DeleteUser
      v-if="deleteUser.data"
      v-model="deleteUser.visible"
      :user="deleteUser.data"
      @cancel="onDeleteCancel"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { GridOptions } from 'ag-grid-community';
  import { TableData } from '../Table/data';
  import { IUser } from '~/api/user';
  import { store } from '~/store';
  import DeleteUser from '../Modal/index.vue';

  export default Vue.extend({
    components: {
      DeleteUser,
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
      users(): IUser.Model[] {
        return store.state.user.users;
      },
    },

    methods: {
      onDeleteShow(user: IUser.Model) {
        this.deleteUser.visible = true;
        this.deleteUser.data = user;
      },

      onDeleteCancel() {
        this.deleteUser.visible = false;
        this.deleteUser.data = null;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .ag-theme-alpine {
    &::v-deep .ag-cell,
    .ag-header-cell {
      padding: 0 20px !important;
    }

    &::v-deep .ag-header-cell[col-id='role'],
    .ag-header-cell[col-id='action'] {
      .ag-header-cell-label {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
