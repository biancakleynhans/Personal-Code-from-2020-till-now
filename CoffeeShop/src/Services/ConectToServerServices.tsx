import React from 'react'
import axios from 'axios';
import { appInj } from './tools';
import { UserLoginUrl, UserRegisterUrl, ShoppingCart_INV, ShoppingCart_PROD, ShoppingCart_CAT, ShoppingCart_ORDER, ShoppingCart_ORDEL,ShoppingCart_INORDERS, ShoppingCart_OUTORDERS, ShoppingCart_CAT_NotLOg } from './ExternalRoutes';
import { iItem, iProduct, iCatagory } from '../Components/ShoppingCart/Models/AdminModels';
import { iProductOredered, iOrder } from '../Components/ShoppingCart/Models/UserModels';


//jwt Interceptor 
// eslint-disable-next-line
var  user: string = ''// eslint-disable-next-line
var  token: string = '' // eslint-disable-next-line
var config = {
  headers: {}
};

function getToken()
{
  var ls = localStorage.getItem('currentUser')
  if(ls !== null)
  {
    var parse =  JSON.parse(ls)
    user = parse.data
    token = parse.data.token
    return setConfig(token)
  }
}

function setToken(response : {}){
  return localStorage.setItem('currentUser', JSON.stringify(response));
}

function setConfig(token: string)
{
  var con =  config = {
    headers: {"Authorization" : `Bearer ${token}`}
  };
  return con
}

export function getUser()
{
  var ls = localStorage.getItem('currentUser')
  if(ls !== null)
  {
    var parse =  JSON.parse(ls)
    return user = parse.data
  }
}

// User Services 
export function LogIn(password: string, username:string) {
  appInj.setLoading('Loading')
  axios.post(UserLoginUrl,{  password, username } )
    .then((res: any)=> {
        if(res !== undefined)
        {
          setToken(res)
          return <div>
                  {appInj.setLoading('')}
                  {window.location.replace('/dashboard')}
                </div>
        }
        else if (res === undefined){window.alert("There has been an error please try again")}
      }
    )
}
export function Register(newUser: any)
{
  appInj.setLoading('Adding new User')
    axios.post(UserRegisterUrl,newUser )
        .then((res: any)=> {
            console.log(res.data, "Response Data")
            if(res !== undefined)
            {
              return <div>
                      {appInj.setLoading('')}
                      {/* how to do redirecting still not working  */}
                      {/* <Redirect exact={true} from="/login" to="/dashboard" /> */}
                      {window.location.replace('/dashboard')}
                  </div>
            }
            else if (res === undefined){window.alert("There has been an error please try again")}
          }
        )
}


//ShoppinCart Services
// Add new entry to DB
export function AddInvItem(invItem: iItem)
{
  var con = getToken()
  appInj.setLoading('Adding new item')
  axios.post(`${ShoppingCart_INV}/addInvItem`,invItem, con)
  .then((res: any)=> {
      if(res !== undefined){return appInj.setLoading('')}
      else if (res === undefined){console.log('error')}
    })
}

export function AddProdItem(prodItem : iProduct)
{
  var con = getToken()
  appInj.setLoading('Adding new product')
  axios.post(ShoppingCart_PROD+'/addProdItem',prodItem,con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  })
}

export function AddCatagoryItem(catItem: iCatagory)
{
  var con = getToken()
  appInj.setLoading('Adding new catagory')
  axios.post(ShoppingCart_CAT+'/addCatItem',catItem, con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  })
}

export function AddOrder(order: iProductOredered)
{
  var con = getToken()
  appInj.setLoading('Adding new Order')
  axios.post(ShoppingCart_ORDER+'/addOrder',order,con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  })
}
  
export function AddOrderDelivery(orderDel: iOrder)
{
  var con = getToken()
  appInj.setLoading('Adding new product')
  axios.post(ShoppingCart_ORDEL+'/addOrederDel',orderDel,con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  })
}

export function AddIncomingOrder(InOrder: iOrder)
{
  var con = getToken()
  appInj.setLoading('Adding new product')
  axios.post(ShoppingCart_INORDERS+'/addIo',InOrder,con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  })
}

export function AddSentOrder(sentOrder: iOrder)
{
  var con = getToken()
  appInj.setLoading('Adding new Sent Order')
  axios.post(ShoppingCart_PROD+'/addSo',sentOrder,con )
  .then((res: any)=> {
      if(res !== undefined){return appInj.setLoading('')}
      else if (res === undefined){console.log('error')}
    })
}

// GET entry from DB
export function GetOrder()   {var con = getToken(); return axios.get(`${ShoppingCart_ORDER}/`, con) }

export function GetInvItem() {var con = getToken(); return axios.get(`${ShoppingCart_INV}/`, con) }

export function GetProdItem() {var con = getToken(); return axios.get(`${ShoppingCart_PROD}/`, con) }

export function GetSentOrders() {var con = getToken(); return axios.get(`${ShoppingCart_OUTORDERS}/`, con) }

export function GetCatagoryItem() {var con = getToken(); return axios.get(`${ShoppingCart_CAT}/`, con) }

export function GetOrderDelivery() {var con = getToken(); return axios.get(`${ShoppingCart_ORDEL}/`, con) }

export function GetRecievedOrders() {var con = getToken(); return axios.get(`${ShoppingCart_INORDERS}/`, con) }

export function GetCatagoryItemNotlogged() {var con = getToken(); return axios.get(`${ShoppingCart_CAT_NotLOg}/`, con) }


//Get single entry with id from DB
export function GetInvItemSingle(id: any) {var con = getToken(); return axios.get(`${ShoppingCart_INV}/${id}`, con) }

export function GetProdItemSingle(id: any) {var con = getToken(); return axios.get(`${ShoppingCart_PROD}/${id}`, con) }

export function GetCatagoryItemSingle(id: any) {var con = getToken(); return axios.get(`${ShoppingCart_CAT}/${id}`, con) }

export function GetRecivedOrderItemSingle(id: any) {var con = getToken(); return axios.get(`${ShoppingCart_INORDERS}/${id}`, con) }



//Update single entry with id  from DB
export function UpdateInvItem(id:any, invItem:iItem)
{
  var con = getToken()
  appInj.setLoading( `Updating item: ${invItem.Name}`)
  axios.post(`${ShoppingCart_INV}/update/${id}`,invItem,con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}

export function UpdateProdItem(id: any,prodItem : iProduct)
{
  var con = getToken()
  appInj.setLoading( `Updating product: ${prodItem.Name}`)
  axios.post(`${ShoppingCart_PROD}/update/${id}`,prodItem,con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}

export function UpdateCatItem(id:any ,catItem: iCatagory)
{
  var con = getToken()
  appInj.setLoading( `Updating Catagory: ${catItem.Name}`)
  axios.post(`${ShoppingCart_CAT}/update/${id}`,catItem,con )
  .then((res: any)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}

//Delete single entry with id from DB
export function DeleteInvItem(id: any)
{var con = getToken();  appInj.setLoading('Deleting Item');  return axios.get(`${ShoppingCart_INV}/delete/${id}`, con).then(()=> {appInj.setLoading(''); window.location.reload()}) }

export function DeleteProdItem(id: any)
{var con = getToken();  appInj.setLoading('Deleting Item');  return axios.get(`${ShoppingCart_PROD}/delete/${id}`, con).then(()=> {appInj.setLoading(''); window.location.reload()}) }

export function DeleteCatItem(id: any)
{var con = getToken();  appInj.setLoading('Deleting Item');  return axios.get(`${ShoppingCart_CAT}/delete/${id}`, con).then(()=> {appInj.setLoading(''); window.location.reload()}) }

export function DeleteOrder(id: any)
{var con = getToken();  appInj.setLoading('Deleting Item'); return axios.get(`${ShoppingCart_ORDER}/delete/${id}`, con).then(()=> {appInj.setLoading(''); window.location.reload()})}

export function DeleteOrderDelivery(id: any)
{var con = getToken();  appInj.setLoading('Deleting Item');  return axios.get(`${ShoppingCart_ORDEL}/delete/${id}`, con).then(()=> {appInj.setLoading(''); window.location.reload()}) }

export function DeleteIncomOrders(id: any)
{var con = getToken();  appInj.setLoading('Deleting Item'); return axios.get(`${ShoppingCart_INORDERS}/delete/${id}`, con).then(()=> {appInj.setLoading(''); window.location.reload()}) }

export function DeleteSentOrders(id: any)
{var con = getToken();  appInj.setLoading('Deleting Item');  return axios.get(`${ShoppingCart_OUTORDERS}/delete/${id}`, con).then(()=> {appInj.setLoading(''); window.location.reload()}) }
