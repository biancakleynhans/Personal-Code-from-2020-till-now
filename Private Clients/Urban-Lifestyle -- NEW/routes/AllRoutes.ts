interface iRoute {
  path: string;
  name: string;
}

interface iRoutes {
  auth: iRoute;
  auth_resetpass: iRoute;
  auth_user_dash: iRoute;
  auth_admin_dash: iRoute;
  shoppingCart: iRoute;
  notify: iRoute;
}

export const AllRoutes: iRoutes = {
  auth: { name: 'Authentication pages', path: '/auth' },
  auth_resetpass: { name: 'Rest Password', path: '/auth/reset' },
  auth_user_dash: { name: 'User Profile Page', path: '/user' },
  auth_admin_dash: { name: 'Admin User Profile Page', path: '/admin' },
  notify: { name: 'Notification', path: '/user/notify' },
  shoppingCart: { name: 'Shopping Cart', path: '/user/cart' },
};

export const TOP_MENU_LINKS: iRoute[] = [];
