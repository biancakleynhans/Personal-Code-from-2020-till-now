// TO DO: add all routes here
export const AllRoutePaths = {
  ADMIN: "/admin",
  ADMIN_UPLOAD_MANUAL: "/upload-manual",
  ADMIN_UPLOAD_FILES: "/upload-files",

  SIGN_IN: "/sign_in",
  SIGN_UP: "/sign_up",
  PASSWORD_FORGET: "/forgot",
  PASSWORD_RESET: "/reset",

  ACCOUNT: "/account",
  CART: "/cart",

  HOME: "/",
  ABOUT: "/about",
  FAQ: "/faq",
  CONTACT: "/contact",

  PRODUCTS: "/products",
  PRODUCTSPRETTY: "/productsPretty"
};

export interface LocationState {
  from: {
    pathname: string;
  };
}
