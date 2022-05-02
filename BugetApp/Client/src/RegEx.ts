// REG EX List needed to sort txt string 
export var RegExp_comma =/[,]/
export var RegExp_findSpaceBetweenNums = /^\d\s\d+/
export var RegExp_date = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g
export var RegExp_descriptionString =  /[,](?:\D+\s\D+)[,]/
export var RegExp_floatNoSpace = /([,](\d{1,2})[.](\d{1,2})[,])/
export var RegExp_floatWithSpace = /(\d{1,2})\s(\d{1,3})[.](\d{1,2})/g
export var RegExp_postCDate = /[,]5257(\d{1,2})\/(\d{1,2})\/(\d{2,4})[,]/
export var RegExp_Replace_postCDate = /[,]5257[,](\d{1,2})\/(\d{1,2})\/(\d{2,4})[,]/

export var RegExp_ArrMatch = RegExp_date.source +
                    RegExp_comma.source+RegExp_date.source +
                    RegExp_descriptionString + RegExp_comma +
                    (RegExp_floatNoSpace|| RegExp_floatWithSpace) + RegExp_comma +
                    (RegExp_floatNoSpace|| RegExp_floatWithSpace)