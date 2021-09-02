import { moment } from '@/helpers/moment';
import { ISubCategory } from '~/api/sub-category';

import Action from '../Action/index.vue';

const DeleteSubCategory = {
  deleteSubCategory: {
    visible: false,
    data: null as ISubCategory.Model,
  },
};

const EditCategory = {
  editSubCategory: {
    visible: false,
    data: null as ISubCategory.Model,
  },
};

export const TableConfig = {
  columnDefs: [
    {
      headerName: 'Name',
      field: 'name',
      sort: 'desc',
      flex: 1,
      minWidth: 160,
      menuTabs: ['filterMenuTab'],
      filter: 'agTextColumnFilter',
      valueGetter(params: any) {
        return params.data.name;
      },
    },
    {
      headerName: 'Instruments',
      field: 'countInstruments',
      width: 160,
      filter: 'agNumberColumnFilter',
      menuTabs: ['filterMenuTab'],
      cellStyle: { justifyContent: 'center' },
    },
    {
      headerName: 'Created',
      field: 'createAt',
      width: 160,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
      valueFormatter(params: any) {
        if (!params.data.createAt) return '';

        return moment(params.data.createAt).format('DD.MM.YYYY HH:mm');
      },
    },
    {
      headerName: 'Action',
      field: 'action',
      width: 160,
      menuTabs: [] as string[],
      cellStyle: { justifyContent: 'center' },
      cellRendererFramework: Action,
    },
  ],

  defaultColDef: {
    sortable: true,
    lockPosition: true,
  },
};

export const TableData = {
  ...EditCategory,
  ...DeleteSubCategory,
  ...TableConfig,
};
