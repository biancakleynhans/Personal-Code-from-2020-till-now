import AppBaseHome from "../pages/shared/AppBaseHome";
import Page404 from "../pages/shared/Page404";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import AdminDash from "../pages/admin/000AdminDash";
import Category from "../pages/admin/001Category";
import SubCategory from "../pages/admin/001SubCategory";
import Products from "../pages/admin/002Products";
import Brand from "../pages/admin/001Brand";
import CategoriesPage from "../pages/client/products/00CategoriesPage";
import SubCategoriesPage from "../pages/client/products/01SubCategoriesPage";
import AllProductsPage from "../pages/client/products/02AllProductsPage";
import ProductPage from "../pages/client/products/03ProductPage";
import UserDash from "../pages/client/userRelated/UserDash";
import Cart from "../pages/client/userRelated/Cart";
import Orders from "../pages/admin/003Orders";
import AllUsers from "../pages/admin/004AllUsers";

export const RoutesObj = {
  admin: {
    dashboard: { name: "Admin Dashboard", path: "/admin", ex: true, comp: AdminDash, show: true },
    cats: { name: "Category ", path: "/cats", ex: true, comp: Category, show: false },
    subcats: { name: "Subcategory", path: "/subcats", ex: true, comp: SubCategory, show: false },
    brands: { name: "Brands", path: "/brands", ex: true, comp: Brand, show: false },
    products: { name: "Products", path: "/products", ex: true, comp: Products, show: false },
    orders: { name: "Orders", path: "/orders", ex: true, comp: Orders, show: false },
    users: { name: "Users", path: "/users", ex: true, comp: AllUsers, show: false }
  },
  client: {
    profile: { name: "Dashboard", path: "/user", ex: true, comp: UserDash, show: true },
    cart: { name: "Cart", path: "/cart", ex: true, comp: Cart, show: false }
    // checkOut: { name: "Checkout", path: "/checkout", ex: true, comp: Checkout, show: false }
  },
  auth: {
    signIn: { name: "Sign in", path: "/signIn", ex: true, comp: SignIn, show: true },
    signUp: { name: "Sign up", path: "/signUp", ex: true, comp: SignUp, show: true },
    forgot: { name: "Forgot password", path: "/forgot", ex: true, comp: Page404, show: true },
    reset: { name: "Reset password", path: "/reset", ex: true, comp: Page404, show: true }
  },
  basic: {
    home: { name: "Home", path: "/", ex: true, comp: AppBaseHome, show: true },
    "404": { name: "404", path: "/*", ex: true, comp: Page404, show: true }
  },
  products: {
    shop: { name: "Shop", path: "/shop", ex: true, comp: CategoriesPage, show: true },
    cat: { name: "Categories", path: "/inventory/:cat", ex: false, comp: SubCategoriesPage, show: false },
    subCat: { name: "Subcategories", path: "/invent/:cat/:subCat", ex: false, comp: AllProductsPage, show: false },
    product: { name: "Product", path: "/inv/:cat/:subCat/:product", ex: false, comp: ProductPage, show: false }
  }
};

export const AuthRoutes = Object.values(RoutesObj.auth);
export const AdminRoutes = Object.values(RoutesObj.admin);
export const ClientRoutes = Object.values(RoutesObj.client);
export const ProductRoutes = Object.values(RoutesObj.products);
