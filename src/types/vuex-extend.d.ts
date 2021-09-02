/* eslint-disable import/named */
import { ActionImpl } from 'direct-vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios/types';
import { NuxtCookies } from 'cookie-universal-nuxt';
import {
  GridApi,
  ColumnApi,
  ICellRendererParams,
} from 'ag-grid-community/dist/lib/main';

declare module 'direct-vuex' {
  export interface ActionsImpl {
    [name: string]: ActionImpl;
    $admin?: boolean;
    $cookies?: NuxtCookies;
    $axios?: NuxtAxiosInstance;
    gridApi?: GridApi;
    columnApi?: ColumnApi;
    params?: ICellRendererParams;
  }
}
