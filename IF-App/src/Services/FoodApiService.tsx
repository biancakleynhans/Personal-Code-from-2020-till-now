import React from 'react'
import axios from 'axios';
import { getToken } from './ConectToServerServices';
import { measuresUri } from '../Components/Models/000Models';

const App_Id = '83679427'
const App_Key ="87b0fc60ab2a41cfdf9f51ad86490aac"

var FoodLink = 'https://api.edamam.com/api/food-database/parser' 
// add ?ingr=' + searchString + '&app_id=' + App_Id + '&app_key=' + App_Key 
//or ?nutrition-type=logging&ingr=' + searchString + '&app_id='+ App_Id + '&app_key='+ App_Key

var NutriLink = 'https://api.edamam.com/api/food-database/nutrients'
// add  ?app_id=' +App_Id + '&app_key=$'+ App_Key

//Use this format for nutri request
// export var NutriUriTypeRequest = {
//   ingredients: [
//       {
//         quantity: 1,
//         measureURI: "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
//         foodId: "food_bnbh4ycaqj9as0a9z7h9xb2wmgat"
//       }
//     ]
// }
export async function NutriApi(quantityClient:number, measureURIClient:string, foodIdClient: string,qualifiersClient?:Array<String>, ingr?: any[])
{
  
  var queryObj = {
    ingredients: [
      {
        quantity: +quantityClient,
        measureuri: measureURIClient,
        foodId: foodIdClient,
        qualifiers: qualifiersClient
      }
    ]
  }

  var QueryObjToSend = ingr ? ingr : queryObj;

  
  console.log("queryObj", queryObj)
  var uri = 'https://api.edamam.com/api/food-database/nutrients?app_id=83679427&app_key=87b0fc60ab2a41cfdf9f51ad86490aac'
 return axios.post(uri,QueryObjToSend )
}




export async function SearchFoodApi(searchString:string, catLabel?: string, health?:string, calMin?:string, calMax?:string)
{
  var hasCatlabel = catLabel ? catLabel : 'food';
  var hasHealth = health ? health : 'shellfish-free';
  var hasCalMin = calMin ? calMin : '0';
  var hasCalMax = calMax ? calMax : '1000';

  var uri = 'https://api.edamam.com/api/food-database/parser'+ 
  '?nutrition-type=logging&ingr=' + searchString + 
  '&categoryLabel=' + hasCatlabel + 
  '&health=' + hasHealth +
  '&calories=' + hasCalMin + '-' + hasCalMax +
  '&app_id='+ App_Id + '&app_key='+ App_Key
  
  return axios.get(uri)
  

}