//User routes Internal
export const UserBaseUrl = 'http://localhost:4000/Users/'
export const UserLoginUrl = UserBaseUrl + 'authenticate'
export const UserRegisterUrl = UserBaseUrl + 'register'


//FAST ROUTES 
export const FastBaseUrl = 'http://localhost:4000/Fast/'
export const FastAddUrl         = FastBaseUrl + 'addFast'
export const FastAddMultiUrl    = FastBaseUrl + "addMultiFast"
export const FastUpdateUrl      = FastBaseUrl + 'update/'
export const FastDeleteUrl      = FastBaseUrl + 'delete/'


//Weight ROUTES 
export const WeightBaseUrl = 'http://localhost:4000/Weight/'
export const WeightAddUrl         = WeightBaseUrl + 'addWeight'
export const WeightAddMultiUrl    = WeightBaseUrl + "addMultiWeight"
export const WeightUpdateUrl      = WeightBaseUrl + 'update/'
export const WeightDeleteUrl      = WeightBaseUrl + 'delete/'

//UserInfoInput

export const UserInfoInputBaseUrl = 'http://localhost:4000/UserInfo/'
export const UserInfoInputAddUrl         = UserInfoInputBaseUrl + 'addUii'
export const UserInfoInputAddMultiUrl    = UserInfoInputBaseUrl + "addMultiUii"
export const UserInfoInputUpdateUrl      = UserInfoInputBaseUrl + 'update/'
export const UserInfoInputDeleteUrl      = UserInfoInputBaseUrl + 'delete/'

//Food Dairy
//Food 
export const FoodDairy_Food_BaseUrl = 'http://localhost:4000/FoodDiary/'


export const FoodDairy_Food_ExcersiseUrl_Send    = FoodDairy_Food_BaseUrl + 'send/' + 'excercise'
export const FoodDairy_Food_ExcersiseUrl_Get    = FoodDairy_Food_BaseUrl +'get/'+ 'excercise'

export const FoodDairy_Food_GoalsUrl_Send        = FoodDairy_Food_BaseUrl + 'send/' + 'goals'
export const FoodDairy_Food_GoalsUrl_Get        = FoodDairy_Food_BaseUrl +'get/'+ 'goals'

export const FoodDairy_Food_AddUrl         = FoodDairy_Food_BaseUrl+ 'Food/' + 'add'
export const FoodDairy_Food_GetUrl         = FoodDairy_Food_BaseUrl+ 'Food/' + 'get'
export const FoodDairy_Food_UpdateUrl      = FoodDairy_Food_BaseUrl+ 'Food/' + 'update/'
export const FoodDairy_Food_DeleteUrl      = FoodDairy_Food_BaseUrl+ 'Food/' + 'delete/'

export const FoodDairy_Food_ConsumedUrl_Get     = FoodDairy_Food_BaseUrl +'get/'+ 'consumed'
export const FoodDairy_Food_ConsumedUrl_Send     = FoodDairy_Food_BaseUrl + 'send/' + 'consumed'
export const FoodDairy_Food_ConsumedUrl_Update     = FoodDairy_Food_BaseUrl + 'update/' + 'consumed/'
export const FoodDairy_Food_ConsumedUrl_Delete     = FoodDairy_Food_BaseUrl + 'delete/' + 'consumed/'

//Meals
export const FoodDairy_Meal_BaseUrl = 'http://localhost:4000/FoodDiary/Meal/'
export const FoodDairy_Meal_AddUrl         = FoodDairy_Meal_BaseUrl + 'add'
export const FoodDairy_Meal_UpdateUrl      = FoodDairy_Meal_BaseUrl + 'update/'
export const FoodDairy_Meal_DeleteUrl      = FoodDairy_Meal_BaseUrl + 'delete/'