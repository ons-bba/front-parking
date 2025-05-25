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
    link: '/backoffice/users/list',
    children: [
      // {
      //   title: 'Add User',
      //   icon: 'person_add',
      //   link: '/backoffice/users/create'
      // },
      //
      {
        title: 'Statistiques',
        icon: 'speed',
        link: '/backoffice/users/dashboard'
      },
      {
        title: 'liste des utilisateurs',
        icon: 'list',
        link: '/backoffice/users/list'
      }
    ]
  },
];
