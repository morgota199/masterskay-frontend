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
    <DeleteModal
      v-if="deleteInstrument.data"
      v-model="deleteInstrument.visible"
      :instrument="deleteInstrument.data"
      @cancel="onDelete"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { GridOptions } from 'ag-grid-community';
  import { TableData } from './data';
  import { store } from '~/store';
  import { IInstruments } from '~/api';
  import DeleteModal from '@/components/pages/admin/instruments/Modal/Delete.vue';

  export default Vue.extend({
    components: { DeleteModal },

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

    methods: {
      onEdit(instrument: IInstruments.Join){
        this.$router.push(`instruments/${instrument._id}/edit`)
      },

      onDelete(instrument: IInstruments.Join | undefined) {
        if(instrument) {
          this.deleteInstrument.visible = true;
          this.deleteInstrument.data = instrument;
        } else {
          this.deleteInstrument.visible = false;
          this.deleteInstrument.data = null;
        }
      }
    }
  });
</script>

<style lang="scss" scoped>
  .ag-theme-alpine::v-deep {
    .ag-cell,
    .ag-header-cell {
      padding: 0 20px !important;
    }

    .ag-header-cell[col-id='price'],
    .ag-header-cell[col-id='action'] {
      .ag-header-cell-label {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
