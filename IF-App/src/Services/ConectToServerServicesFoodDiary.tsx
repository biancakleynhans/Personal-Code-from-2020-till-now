import axios from 'axios';
import { getToken } from './ConectToServerServices';
import { 
  FoodDairy_Food_AddUrl, FoodDairy_Food_BaseUrl, FoodDairy_Food_UpdateUrl, FoodDairy_Food_DeleteUrl,FoodDairy_Food_GetUrl,
  FoodDairy_Food_ConsumedUrl_Get,FoodDairy_Food_ConsumedUrl_Send,FoodDairy_Food_ConsumedUrl_Update,FoodDairy_Food_ConsumedUrl_Delete,
  FoodDairy_Food_ExcersiseUrl_Get,FoodDairy_Food_ExcersiseUrl_Send,
  FoodDairy_Food_GoalsUrl_Get,FoodDairy_Food_GoalsUrl_Send,
  FoodDairy_Meal_AddUrl,FoodDairy_Meal_BaseUrl,
} from './ExternalRoutes';
import { iFoodItemComplete } from '../Components/Models/000Models';

//FOOD
export function AddFood(FoodItem: iFoodItemComplete)
{
  // console.log("AddFood => ",FoodItem)
  var con = getToken()
  return axios.post(FoodDairy_Food_AddUrl,FoodItem, con)
}

export function GetFood() 
{
  var con = getToken(); 
  return axios.get(FoodDairy_Food_GetUrl, con)  
}

export function GetSingleFood(id: any) 
{
  var con = getToken(); 
  return axios.get(`${FoodDairy_Food_BaseUrl}${id}`, con)
}

export function UpdateFood(id:any, Food:any)
{
  console.log("UpdateFood => ", id, Food)
  var con = getToken()
  return axios.post(`${FoodDairy_Food_UpdateUrl}${id}`,Food,con )
}

export function DeleteFood(id: any)
{
  console.log("DeleteFood => ", id)
  var con = getToken();  
  return axios.get(`${FoodDairy_Food_DeleteUrl}${id}`, con)
  
}

//Consumed
export function GetFoodConsumed() 
{
  var con = getToken(); 
  return axios.get(FoodDairy_Food_ConsumedUrl_Get, con) 
}

export function AddFoodConsumed(FoodItem:iFoodItemComplete) 
{
  // console.log("AddFoodConsumed",FoodItem, mealName, date)
 
  console.log("AddFoodConsumed",FoodItem)
  var con = getToken(); 
  return axios.post(FoodDairy_Food_ConsumedUrl_Send,FoodItem, con) 
}

export function UpdateFoodConsumed(id:any, Food:iFoodItemComplete)
{
  var con = getToken()
  return axios.post(`${FoodDairy_Food_ConsumedUrl_Update}${id}`,Food,con )
}

export function DeleteFoodConsumed(id: any)
{
  var con = getToken();   
  return axios.get(`${FoodDairy_Food_ConsumedUrl_Delete}${id}`, con)
 
}




export function GetExcersise() 
{
  var con = getToken(); 
  return axios.get(FoodDairy_Food_ExcersiseUrl_Get, con) 
}

export function SendExcersise(date:any, excersise: number) 
{
  var con = getToken(); 
  var Obj = {
    date: date,
    caloriesBurned: excersise
  }
  return axios.post(FoodDairy_Food_ExcersiseUrl_Send,Obj, con) 
}

export function GetGoals(date:any) 
{
  var con = getToken(); 
  return axios.post(FoodDairy_Food_GoalsUrl_Get,date,con) 
}

export function SetGoals(goals:any) 
{
  var con = getToken(); 
  return axios.post(FoodDairy_Food_GoalsUrl_Send,goals,con) 
}

//MEAL

export function AddMeal(Meal: any)
{
  console.log(Meal, "Meal??")
  var con = getToken()
  return axios.post(FoodDairy_Meal_AddUrl,Meal, con)
}

export function GetMeal() 
{
  var con = getToken(); 
  return axios.get(FoodDairy_Meal_BaseUrl, con) 
}

export function GetSingleMeal(id: any) 
{
  var con = getToken(); 
  return axios.get(`${FoodDairy_Food_BaseUrl}${id}`, con)
}

export function UpdateMeal(id:any, Meal:any)
{
  console.log("UpdateMeal", id, Meal)
  var con = getToken()
  return axios.post(`${FoodDairy_Food_UpdateUrl}${id}`,Meal,con )
  
}

export function DeleteMeal(id: any)
{
  var con = getToken();  
  return axios.get(`${FoodDairy_Food_DeleteUrl}${id}`, con)
  
}

export function DeleteMealItem(id: any)
{
  var con = getToken();  
  return axios.get(`${FoodDairy_Food_DeleteUrl}${id}`, con)
  
}


