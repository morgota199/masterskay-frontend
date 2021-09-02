import { moment } from '@/helpers/moment';
import { IUser } from '~/api/user';
import Role from '../Action/Role.vue';
import Delete from '../Action/Delete.vue';

const DeleteUser = {
  deleteUser: {
    visible: false,
    data: null as IUser.Model,
  },
};

export const TableConfig = {
  columnDefs: [
    {
      headerName: 'Email',
      field: 'email',
      sort: 'desc',
      flex: 1,
      minWidth: 160,
      menuTabs: ['filterMenuTab'],
      filter: 'agTextColumnFilter',
      valueGetter(params: { data: IUser.Model }) {
        return params.data.email;
      },
    },
    {
      headerName: 'Role',
      field: 'role',
      sort: 'desc',
      flex: 1,
      minWidth: 160,
      menuTabs: ['filterMenuTab'],
      filter: 'agTextColumnFilter',
      cellStyle: { justifyContent: 'center' },
      keyCreator: (params: any) => (params.value ? 'Admin' : 'User'),
      cellRendererFramework: Role,
    },
    {
      headerName: 'Last Login',
      field: 'lastLogin',
      width: 160,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
      cellStyle: { justifyContent: 'center' },
      valueFormatter(params: { data: IUser.Model }) {
        if (!params.data.createAt) return '';

        return moment(params.data.lastLogin).format('DD.MM.YYYY HH:mm');
      },
    },
    {
      headerName: 'Created',
      field: 'createAt',
      width: 160,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
      cellStyle: { justifyContent: 'center' },
      valueFormatter(params: { data: IUser.Model }) {
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
      cellRendererFramework: Delete,
    },
  ],

  defaultColDef: {
    sortable: true,
    lockPosition: true,
  },
};

export const TableData = {
  ...DeleteUser,
  ...TableConfig,
};
