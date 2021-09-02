import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import { ColumnApi } from 'ag-grid-community/dist/lib/columnController/columnApi';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

declare module 'vue/types/vue' {
  export interface Vue {
    // "isAdmin" computed
    $admin: boolean;

    // Ag-Grid
    gridApi: GridApi;
    columnApi: ColumnApi;
    params: ICellRendererParams;
  }
}
