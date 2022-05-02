
import React from 'react'
import { GetDurationText} from '../../Util/FastUtil';
import { getType, setTimerRunning, getTimerRunning, removeTimerRunning} from '../../Cache/FastCache';
import { iTimePeriod } from '../../Models/FastModels';
import { AddFast } from '../../../Services/ConectToServerServices';
import moment  from 'moment'


export default class FastTimerPage extends React.Component {
  
  typeofFast:any
  iTimeP: iTimePeriod = {startTime:new Date()}
  disp:string = "Not started"
  dispDur:string = "0.0 %"
  dispStartTime:string = "Not Started"
  tmrSecond = undefined
  interval:any

  

  componentWillMount(){
    this.typeofFast = getType()
    this.getTypeFunc()
    this.getrunningTimer()
  }

  Timer(start:Date)
  { 
    const f=()=>{
      this.disp = GetDurationText(start);
      this.getDurRunning()
      this.forceUpdate()
      this.interval = setTimeout(f,1000);
    } 
    f();
  }

  getTypeFunc()
  {
    if(this.typeofFast !== undefined)
    {console.log("HERE type of fast");return this.iTimeP.typeofFast = this.typeofFast}
    else{console.log("NOT HERE type of fast"); window.location.replace('/fastType')}
  }

  getrunningTimer()
  {
    var d = getTimerRunning()
    if(d !== undefined)
    {
      console.log("HERE");
      this.iTimeP.startTime = new Date(d);  // eslint-disable-next-line
      var x = this.iTimeP.startTime.toString()
      this.dispStartTime = ( x = moment().format('llll'))
      this.forceUpdate()
      this.Timer(this.iTimeP.startTime)
    }
    if(d === undefined)
    {
      console.log("NOt HERE ")
      this.forceUpdate()
    }
  }

  getDurRunning()
  {
    
    var start = (this.iTimeP.startTime).getTime()
    var dur  = ((new Date()).getTime() - start)/3600000

    if(this.typeofFast !== undefined && dur !==undefined && start !== undefined)
    {
      var diff = (dur / this.typeofFast.lengthofFast)/100
      var rs = `${diff.toFixed(2)} %`
      this.dispDur = rs
      //console.log(rs, "dur")
    }
  }

 
  render() {
    return (
      <div>
        {}
        <h1>Fast Timer</h1>
        <button className="btn" onClick={()=>{
          this.iTimeP.startTime = new Date();
          this.Timer(this.iTimeP.startTime)
          setTimerRunning(this.iTimeP.startTime)
        }}>Start Fast</button><br/><br/><br/>

          Started At: <br/> {this.dispStartTime}<br/><br/><br/>
          Type of Fast: {this.typeofFast.name}  <br/><br/>
          Time: {this.disp} <br/> <br/><br/>
          Duration : {this.dispDur} <br/><br/><br/>

        <button className="btn" onClick= {()=> {
          clearInterval(this.interval)
          this.iTimeP.endTime = new Date()
          this.iTimeP.duration = ( (this.iTimeP.endTime.getTime()) -(this.iTimeP.startTime.getTime()) )/3600000
          //console.log(this.iTimeP, "end of fast")
          this.disp = "Done Please Restart"
          removeTimerRunning()
          AddFast(this.iTimeP)
          this.forceUpdate()
        }}>End timer</button> <br/>
        
      </div>
    )
  }
}
