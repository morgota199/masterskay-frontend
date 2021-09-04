import { moment } from '@/helpers/moment';
import { IInstruments } from '~/api';
import Action from '../Action/index.vue';

const deleteInstrument = {
  deleteInstrument: {
    visible: false,
    data: null as IInstruments.Join,
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
    },
    {
      headerName: 'Price',
      field: 'price',
      sort: 'desc',
      flex: 1,
      minWidth: 70,
      menuTabs: ['filterMenuTab'],
      filter: 'agTextColumnFilter',
      cellStyle: { justifyContent: 'center' },
      valueGetter(params: { data: IInstruments.Join }) {
        return `${params.data.price} $`;
      },
    },
    {
      headerName: 'Categories',
      field: 'categories',
      width: 160,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
      cellStyle: { justifyContent: 'center' },
      valueGetter(params: { data: IInstruments.Join }) {
        return params.data.categories.length;
      },
    },
    {
      headerName: 'Sub categories',
      field: 'subCategories',
      width: 160,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
      cellStyle: { justifyContent: 'center' },
      valueGetter(params: { data: IInstruments.Join }) {
        return params.data.subCategories.length;
      },
    },
    {
      headerName: 'Created',
      field: 'createAt',
      width: 160,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
      valueGetter(params: { data: IInstruments.Join }) {
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
  ...deleteInstrument,
  ...TableConfig,
};
