import React from 'react'
import { AddWeightForm } from './001WeightAdd';
import { AddMultiWeight } from '../../../Services/ConectToServerServices';

export default class WeightBackLogs extends React.Component {

  handleForce = (data:any) => {
    console.log(data);// eslint-disable-next-line
    data.map((entry:any)=>{
      //console.log(new Date(entry[1]), "single")
      var date          =entry[0]
      var weight        =entry[1]
      var bodyFat       =entry[2]
      var muscleMass    =entry[3]
      var waterDensity  =entry[4]
      var boneDensity   =entry[5]
      var notes         =entry[6]

      var obj ={
        date : date,              
        weight : weight,          
        bodyFat : bodyFat,        
        muscleMass : muscleMass,  
        waterDensity: waterDensity,
        boneDensity: boneDensity,  
        notes : notes         
      }

      AddMultiWeight(obj)
    })
  };

  render() {
    return (
      <div>
        <div>
        <h1>Weight BackLogs</h1>
        <h2>
          Please select the csv file you would like to capture <br/> 
          <strong className="imp"> please keep in following format</strong> <br/>
          date, weight, bodyFat, muscleMass, waterDensity, boneDensity, notes ie: <br/>
          "2019-08-01T19:45:00Z","100", "50", "30", "10", "10", "none"<br/>
        </h2><br/><br/>
        <input type="file" onChange={e=>{
          var f=e.target.files && e.target.files[0];
          if(f)
          {
            var fr=new FileReader();
            fr.onloadend=le=>{
              if(typeof(fr.result)=='string')
              {
                var str:string=fr.result  || ''
                var byline=str.split("\r").join("").split("\n").reduce((s,c)=>{
                  s.push(c.split('"').join("").split(",").map(o=>o.trim()))
                  return s;
                },[] as string[][]);
                if(byline !== undefined){this.handleForce(byline);}
                if(byline === undefined){window.alert("Seems to have a problem please check file again")}
                
              }

            }
            fr.readAsText(f);
          }
        }} />

        <hr/><hr/>
        <AddWeightForm></AddWeightForm>
        
      </div>
      </div>
    )
  }
}
