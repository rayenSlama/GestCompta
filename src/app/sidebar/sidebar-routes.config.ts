export const ROUTES = [
    { path: '/dashbord', title: 'Dashboard', icon: 'dashboard', children: null },
    { path: '#settings',id:'settings', title: 'Paramétrage', icon: 'settings', children: [
      {path: 'clients', title: 'Clients', icon: '' ,children: null},
        {path: 'fournisseurs', title: 'Fournisseurs', icon: '' ,children: null},
        {path: 'tiers', title: 'Gestion des tiers', icon: '' ,children: null},
    ]},
    { path: 'profil', title: 'Profile', icon: 'account_circle', children: null },
    { path: 'table', title: 'Plan Comptable', icon: 'content_paste', children: null },
    { path: '#component', id: 'component', title: 'Component', icon: 'apps', children: [
        {path: 'components/journal', title: 'Journal Comptable', icon: 'JC'},
        {path: 'components/Grand Livre', title: 'Grand Livre', icon: 'GL'},
        {path: 'components/Balance comptable', title: 'Balance Comptable', icon: 'BC'},
      ]},
    { path: 'ecrtcompta', title: 'Ecritures comptables', icon: 'content_paste', children: null },
    { path: 'list-user', title: 'Gestion des utilisateurs', icon: 'person', children: null },
    
    { path: 'deconnexion', title: 'Déconnexion', icon: 'logout' }
];
