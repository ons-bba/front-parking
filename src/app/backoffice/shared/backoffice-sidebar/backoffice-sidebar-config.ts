// backoffice-sidebar.config.ts



import {MenuItem} from './MenuItem.interface';

export const BACKOFFICE_SIDEBAR_CONFIG: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'speed',
    link: '/backoffice/dashboard',
    exact: true
  },
  {
    title: 'User Management',
    icon: 'people',
    link: '/backoffice/users',
    children: [
      {
        title: 'liste des utilisateurs',
        icon: 'list',
        link: '/backoffice/users/list'
      },
      {
        title: 'Add User',
        icon: 'person_add',
        link: '/backoffice/users/create'
      }
    ]
  },
];
