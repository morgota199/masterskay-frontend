<template>
  <div class="instruments-table table">
    <ag-grid-vue
      class="ag-theme-alpine"
      dom-layout="autoHeight"
      multi-sort-key="ctrl"
      pagination
      pagination-page-size="10"
      :grid-options="gridOptions"
      :default-col-def="defaultColDef"
      :column-defs="columnDefs"
      :row-data="instruments"
      :row-height="70"
      :lock-position="true"
      :suppress-movable="true"
      :suppress-row-click-selection="true"
      :suppress-drag-leave-hides-columns="true"
      :overlay-no-rows-template="'<span />'"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { GridOptions } from 'ag-grid-community';
  import { TableData } from './data';
  import { store } from '~/store';
  import { IInstruments } from '~/api';

  export default Vue.extend({
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
      instruments(): IInstruments.Join[] {
        return store.state.instruments.instruments;
      },
    },
  });
</script>

<style lang="scss" scoped></style>
