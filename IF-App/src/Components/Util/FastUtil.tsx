import { iTypeofFast } from './../Models/FastModels';
import * as moment from 'moment';


export function GetDurationText(start?:Date,end?:Date): string
{
  //console.log("inside get dur text", start, ":start", end, ":end")
  let vend=end;
  
  if(!start) return "Not Started";
  if(!vend){vend=new Date();}
  var diff_ms = vend.getTime()- start.getTime();
  var d = moment.duration(diff_ms);// eslint-disable-next-line
  var rs = `${d.days(),0}:${d.hours()}:${d.minutes()}:${d.seconds()}`;
  //console.log(rs, "rs")
  return rs;    
}

export function SetFastType(name: string, customTime?: number): iTypeofFast
{
  var typeOfFast:iTypeofFast = {name: '', lengthofFast: 0, nonFastingTime: 0}
  
  if( name === '12:12')
  {
    
    typeOfFast.name = name
    typeOfFast.lengthofFast = 12 
    typeOfFast.nonFastingTime = 12

  }
  if(  name === '16:8')
  {
    
    typeOfFast.name = name
    typeOfFast.lengthofFast = 16 
    typeOfFast.nonFastingTime = 8 
  }
  if(  name === '18:6') 
  {
    
    typeOfFast.name = name
    typeOfFast.lengthofFast = 18 
    typeOfFast.nonFastingTime = 6 
  }
  if(  name === '20:4')
  {
    
    typeOfFast.name = name
    typeOfFast.lengthofFast = 20
    typeOfFast.nonFastingTime = 4 
  }
  if(  name === '24:24')
  {
    
    typeOfFast.name = name
    typeOfFast.lengthofFast = 24 
    typeOfFast.nonFastingTime = 24 
  }
  if(  name === '24:48')
  {
    
    typeOfFast.name = name
    typeOfFast.lengthofFast = 24 
    typeOfFast.nonFastingTime = 48 
  }
  if(  name === 'custom' && customTime !== undefined)
  {
    
    typeOfFast.name = name
    typeOfFast.lengthofFast = customTime
    console.log('Custom Length: ', typeOfFast.lengthofFast)
    typeOfFast.nonFastingTime = customTime
  }
  
  return typeOfFast
}
