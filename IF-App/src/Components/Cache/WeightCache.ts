import { iWeightEntry } from '../Models/WeightModels';
import { iUserInfo } from '../Pages/UserInfo/000UserInputInnerForm';
export function getWeight()
{
    var ls = localStorage.getItem('CurrentWeight')
    if(ls !== null)
    {
        var parse:iWeightEntry =  {}
        parse = JSON.parse(ls)
        return parse
    }
    if(ls === null){return }
}

export function setWeight(type:iWeightEntry)
{return localStorage.setItem('CurrentWeight', JSON.stringify(type))}


export function removeWeight()
{return localStorage.removeItem('CurrentWeight')}

//////////////////////////////////////////////////////////////////////////

export function getUserINFO()
{
    var ls = localStorage.getItem('CurrentUserINFO')
    if(ls !== null)
    {
        var parse
        parse = JSON.parse(ls)
        return parse
    }
    if(ls === null){return }
}

export function setUserINFO(iUF:iUserInfo)
{return localStorage.setItem('CurrentUserINFO', JSON.stringify(iUF))}


export function removeUserINFO()
{return localStorage.removeItem('CurrentUserINFO')}

