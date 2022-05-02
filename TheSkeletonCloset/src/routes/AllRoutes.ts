export const AllRoutesObj = {
  auth: {
    signIn: { title: "Sign in", path: "/signIn" },
    signUp: { title: "Sign up", path: "/signUp" },
    forgotPass: { title: "Forgot Password", path: "/forgotPass" },
    resetPass: { title: "Reset Password", path: "/resetPass" }
  },
  menu: {
    home: { title: "Home", path: "/" },
    // about: { title: "About", path: "/about" },
    contact: { title: "Contact Us", path: "/contact" },
    // faq: { title: "FAQ", path: "/faq" },
    landing: { title: "Products", path: "/inventory" }
  },
  user: {
    dash: { title: "Dashboard", path: "/dash" },
    cart: { title: "Cart", path: "/cart" }
  },
  admin: {
    dash: { title: "Admin Upload", path: "/admin" },
    uploadManual: { title: "Admin Upload Products Manual", path: "/admin_manual" },
    // uploadFiles: { title: "Admin Upload Products Files", path: "/admin_file" },
    uploadImages: { title: "Admin Upload Products as JPG", path: "/admin_img" }
  },
  products: {
    cat: { title: "Products", path: "/inventory/:cat" },
    subCat: { title: "Products", path: "/invent/:cat/:subCat" },
    product: { title: "Products", path: "/inv/:cat/:subCat/:product" }
  }
};

export const MenuItems = Object.values({ ...AllRoutesObj.menu });
export const AdminMenu = Object.values(AllRoutesObj.admin);
export const AllRoutes = Object.values({ ...AllRoutesObj.menu, ...AllRoutesObj.auth, ...AllRoutesObj.user, ...AllRoutesObj.admin, ...AllRoutesObj.products }).reverse();

export interface LocationState {
  from: {
    pathname: string;
  };
}
