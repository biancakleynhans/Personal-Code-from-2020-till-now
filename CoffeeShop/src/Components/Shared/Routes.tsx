import React from 'react'
import Home from './Home.component'
import TestPage from './testPage';
import RegisterPage from '../Authentication/Register.component';
import DashboardPage from '../Authentication/Dashboard.component';
import LoginPage from '../Authentication/Login.component';
import AddItemPage from '../ShoppingCart/Pages/AdminPages/Items/AddItem';
import EditItemPage from '../ShoppingCart/Pages/AdminPages/Items/EditItem';
import ViewItemsPage from '../ShoppingCart/Pages/AdminPages/Items/ViewItems';
import AddProductPage from '../ShoppingCart/Pages/AdminPages/Products/AddProduct';
import ViewProductPage from '../ShoppingCart/Pages/AdminPages/Products/ViewProducts';
import EditProductPage from '../ShoppingCart/Pages/AdminPages/Products/EditProduct';
import AddCatagoryPage from '../ShoppingCart/Pages/AdminPages/Catagory/AddCatagory';
import EditCatagoryPage from '../ShoppingCart/Pages/AdminPages/Catagory/EditCatagory';
import ViewCatagoryPage from '../ShoppingCart/Pages/AdminPages/Catagory/ViewCatagory';
import ViewShopNotLogedIn from '../ShoppingCart/Pages/UserPages/ViewShopNotLogIn';
import ViewShop from '../ShoppingCart/Pages/UserPages/ViewShop';
import AddToCart from '../ShoppingCart/Pages/UserPages/AddToCart';
import ViewCartItems from '../ShoppingCart/Pages/UserPages/ViewCartItems';
import CheckOutPage from '../ShoppingCart/Pages/UserPages/CheckOut';



export const routes = 
{
  //Shared Routes
  home:{
    path: '/',
    exact: true,
    breadcrumb: () => <div>home!</div>,
    component: Home,
    name: "Home"
  },
  test:{
    path: '/test',
    exact: true,
    breadcrumb: () => <div>Test!</div>,
    component: TestPage,
    name: "Test Page"
  },

  //Auting Routes
  login:{
    path: '/login',
    exact: true,
    breadcrumb: () => <div>LogIn!</div>,
    component: LoginPage,
    name: "Login Page"
  },
  register:{
    path: '/register',
    exact: true,
    breadcrumb: () => <div>Register!</div>,
    component: RegisterPage,
    name: "Register Page"
  },
  dashboard:{
    path: '/dashboard',
    exact: true,
    breadcrumb: () => <div>dashboard!</div>,
    component: DashboardPage,
    name: "Dashboard Page"
  },

  //ShoppingCart Routes

  //Item
  addItem:{
    path: '/addItem',
    exact: true,
    breadcrumb: () => <div>Add Item!</div>,
    component: AddItemPage,
    name: "Add Item Page"
  },
  editItem:{
    path: '/editItem',
    exact: true,
    breadcrumb: () => <div>Edit Item!</div>,
    component: EditItemPage,
    name: "Edit Item Page"
  },
  viewItem:{
    path: '/viewItem',
    exact: true,
    breadcrumb: () => <div>View Items!</div>,
    component: ViewItemsPage,
    name: "View Item Page"
  },

  //Product
  addProduct:{
    path: '/addProduct',
    exact: true,
    breadcrumb: () => <div>Add Item!</div>,
    component: AddProductPage,
    name: "Add Product Page"
  },
  editProduct:{
    path: '/editProduct',
    exact: true,
    breadcrumb: () => <div>Edit Item!</div>,
    component: EditProductPage,
    name: "Edit Product Page"
  },
  viewProduct:{
    path: '/viewProducts',
    exact: true,
    breadcrumb: () => <div>View Items!</div>,
    component: ViewProductPage,
    name: "View Product Page"
  },

  //Catagory
  addCatagory:{
    path: '/addCatagory',
    exact: true,
    breadcrumb: () => <div>AddCatagory!</div>,
    component: AddCatagoryPage,
    name: "Add Catagory Page"
  },
  editCatagory:{
    path: '/editCatagory',
    exact: true,
    breadcrumb: () => <div>EditCatagory!</div>,
    component: EditCatagoryPage,
    name: "Edit Catagory Page"
  },
  viewCatagory:{
    path: '/viewCatagory',
    exact: true,
    breadcrumb: () => <div>View Catagory!</div>,
    component: ViewCatagoryPage,
    name: "View Catagory Page"
  },

  //Shop
  viewShopNL:{
    path: '/shopNL',
    exact: true,
    breadcrumb: () => <div>Shop Not Logged In!</div>,
    component: ViewShopNotLogedIn,
    name: "ShopNL"
  },
  viewShop:{
    path: '/shop',
    exact: true,
    breadcrumb: () => <div>Shop!</div>,
    component: ViewShop,
    name: "Shop"
  },

  //Cart
  addToCart:{
    path: '/addTocart',
    exact: true,
    breadcrumb: () => <div>Add current Item to cart</div>,
    component: AddToCart,
    name: "Add To Cart"
  },
  viewCart:{
    path: '/cart',
    exact: true,
    breadcrumb: () => <div>Cart!</div>,
    component: ViewCartItems,
    name: "Cart"
  },
  checkOut:{
    path: '/checkOut',
    exact: true,
    breadcrumb: () => <div>checkOut!</div>,
    component: CheckOutPage,
    name: "checkOut"
  },


    

  //Not defined show this
  NoRouteDefined: {
    NotFound: <div>Page NotFound</div>
  }
  
  }
export const NotFound = () => routes.NoRouteDefined.NotFound
  