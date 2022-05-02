//User routes Internal
export const UserBaseUrl = 'http://localhost:4000/Users/'
export const UserLoginUrl = UserBaseUrl + 'authenticate'
export const UserRegisterUrl = UserBaseUrl + 'register'

// ShoppingCart routes Internal
export const ShoppingCartBaseUrl    = 'http://localhost:4000/'
export const ShoppingCart_INV       = ShoppingCartBaseUrl + 'InvItem'
export const ShoppingCart_PROD      = ShoppingCartBaseUrl + 'ProdItem'
export const ShoppingCart_CAT       = ShoppingCartBaseUrl + 'CatItem'
export const ShoppingCart_ORDER     = ShoppingCartBaseUrl + 'Order'
export const ShoppingCart_ORDEL     = ShoppingCartBaseUrl + 'OrderDel'
export const ShoppingCart_INORDERS  = ShoppingCartBaseUrl + 'IncommingOrders'
export const ShoppingCart_OUTORDERS = ShoppingCartBaseUrl + 'SentOrders'
export const ShoppingCart_CAT_NotLOg= ShoppingCartBaseUrl + 'CatItem/notlog'

//Stock routes Internal
export const ShoppingCart_STOCK     = ShoppingCartBaseUrl + 'Stock'
