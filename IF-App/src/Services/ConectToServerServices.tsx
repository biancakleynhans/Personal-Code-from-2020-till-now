import React from 'react'
import axios from 'axios';
import { appInj } from '../Components/Util/tools';
import { UserLoginUrl, UserRegisterUrl, 
         FastAddUrl, FastBaseUrl, FastUpdateUrl, FastDeleteUrl, FastAddMultiUrl, WeightAddUrl, WeightAddMultiUrl, WeightBaseUrl, WeightUpdateUrl, WeightDeleteUrl, UserInfoInputAddUrl, UserInfoInputAddMultiUrl, UserInfoInputBaseUrl, UserInfoInputUpdateUrl, UserInfoInputDeleteUrl,
} from './ExternalRoutes';
import { iUser } from '../Components/Pages/Authentication/userModels&&FormProps';
import { iTimePeriod } from '../Components/Models/FastModels';
import { iWeightEntry } from '../Components/Models/WeightModels';
import { iUserInfo } from '../Components/Pages/UserInfo/000UserInputInnerForm';

//jwt Interceptor 
// eslint-disable-next-line
var  user: iUser
var  token: string = '' // eslint-disable-next-line
var config = {
  headers: {}
};

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
  if(ls === null)
  {return null}

}
export function getToken()
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

export function getUserLoggedin()
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

// User Services 
export function LogIn(password: string, username:string) {
  appInj.setLoading('Loggin In')
  axios.post(UserLoginUrl,{  password, username } )
    .then((res)=> {
        if(res !== undefined)
        {
          setToken(res)
          return <div>
                  {appInj.setLoading('')}
                  {window.location.replace('/dashboard')}
                </div>
        }
        else {appInj.setLoading(''); window.alert("There has been an error please try again")}
      }
    )
}
export function Register(newUser: any)
{
  appInj.setLoading('Adding new User')
    axios.post(UserRegisterUrl,newUser )
        .then((res)=> {
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


//FASTS
export function AddFast(Fast: iTimePeriod | any)
{
  console.log(Fast, "fast??")
  var con = getToken()
  appInj.setLoading('Adding new Fast')
  axios.post(FastAddUrl,Fast, con)
  .then((res)=> {
      if(res !== undefined){return appInj.setLoading('');}
      else if (res === undefined){console.log('error')}
    })
}
export function AddMultiFast(Fast: iTimePeriod | any)
{
  //console.log(Fast, "fast??")
  appInj.setLoading('Start to Add Bulk Fasts')
  var con = getToken()
  axios.post(FastAddMultiUrl,Fast, con)
  .then((res)=> {
      if(res !== undefined){console.log("done");appInj.setLoading('') }
      else if (res === undefined){console.log('error')}
    })
}
export function GetFasts() 
{
  var con = getToken(); 
  return axios.get(FastBaseUrl, con) 
}
export function GetSingleFast(id: any) 
{
  var con = getToken(); 
  return axios.get(`${FastBaseUrl}${id}`, con)
}
export function UpdateFast(id:any, Fast:any)
{
  var con = getToken()
  appInj.setLoading("Updating ...")
  axios.post(`${FastUpdateUrl}${id}`,Fast,con )
  .then((res)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}
export function DeleteFast(id: any)
{
  var con = getToken();  
  appInj.setLoading('Deleting ...');  
  axios.get(`${FastDeleteUrl}${id}`, con)
  .then((res)=> {
    if(res !== undefined){window.location.reload(true); return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}

//WEIGHT
export function AddWeight(Weight: iWeightEntry | any)
{
  console.log(Weight, "weight??")
  var con = getToken()
  appInj.setLoading('Adding new Weight')
  axios.post(WeightAddUrl,Weight, con)
  .then((res)=> {
      if(res !== undefined){return appInj.setLoading('');}
      else if (res === undefined){console.log('error')}
    })
}
export function AddMultiWeight(Weight: iWeightEntry | any)
{
  //console.log(Weight, "Weight??")
  appInj.setLoading('Start to add bulk Weights')
  var con = getToken()
  axios.post(WeightAddMultiUrl,Weight, con)
  .then((res)=> {
      if(res !== undefined){console.log("done");appInj.setLoading('') }
      else if (res === undefined){console.log('error')}
    })
}
export function GetWeight() 
{
  var con = getToken(); 
  return axios.get(WeightBaseUrl, con) 
}
export function GetSingleWeight(id: any) 
{
  var con = getToken(); 
  return axios.get(`${WeightBaseUrl}${id}`, con)
}
export function UpdateWeight(id:any, Weight:any)
{
  var con = getToken()
  appInj.setLoading("Updating ...")
  axios.post(`${WeightUpdateUrl}${id}`,Weight,con )
  .then((res)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}
export function DeleteWeight(id: any)
{
  var con = getToken();  
  appInj.setLoading('Deleting ...');  
  axios.get(`${WeightDeleteUrl}${id}`, con)
  .then((res)=> {
    if(res !== undefined){window.alert("Deleted"); return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}


//User Info Input
export function AddUii(Uii: iUserInfo | any)
{
  console.log(Uii, "Uii??")
  var con = getToken()
  appInj.setLoading('Adding new User Info')
  axios.post(UserInfoInputAddUrl,Uii, con)
  .then((res)=> {
      if(res !== undefined){return appInj.setLoading('');}
      else if (res === undefined){console.log('error')}
    })
}
export function AddMultiUii(Uii: iUserInfo | any)
{
  //console.log(Uii, "Uii??")
  appInj.setLoading('Start')
  var con = getToken()
  axios.post(UserInfoInputAddMultiUrl,Uii, con)
  .then((res)=> {
      if(res !== undefined){console.log("done");appInj.setLoading('') }
      else if (res === undefined){console.log('error')}
    })
}
export function GetUii() 
{
  var con = getToken(); 
  return axios.get(UserInfoInputBaseUrl, con) 
}
export function GetSingleUii(id: any) 
{
  var con = getToken(); 
  return axios.get(`${UserInfoInputBaseUrl}${id}`, con)
}
export function UpdateUii(id:any, Uii:any)
{
  var con = getToken()
  appInj.setLoading("Updating ...")
  axios.post(`${UserInfoInputUpdateUrl}${id}`,Uii,con )
  .then((res)=> {
    if(res !== undefined){return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}
export function DeleteUii(id: any)
{
  var con = getToken();  
  appInj.setLoading('Deleting ...');  
  axios.get(`${UserInfoInputDeleteUrl}${id}`, con)
  .then((res)=> {
    if(res !== undefined){window.alert("Deleted"); return appInj.setLoading('')}
    else if (res === undefined){console.log('error')}
  }) 
}

