import { NavInterface } from './Nav.interface';

export const AdminCategories = [
  {
    path: '/admin/users',
    icon: 'user',
    text: 'Users',
  },
  {
    path: '/admin/instruments',
    icon: 'instruments',
    text: 'Instruments',
  },
  {
    path: '/admin/categories',
    icon: 'categories',
    text: 'Categories',
  },
] as NavInterface.Item[];

export const UserCategories = [] as NavInterface.Item[];
