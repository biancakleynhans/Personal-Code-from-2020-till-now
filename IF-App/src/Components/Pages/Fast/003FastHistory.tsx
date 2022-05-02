import React from 'react'
import { GetFasts } from '../../../Services/ConectToServerServices';
import { generator, appInj } from '../../Util/tools';
import moment  from 'moment'
import { Link } from 'react-router-dom';



export default class FastHistoryPage extends React.Component {
  x:any[] = []
 
  constructor(props:any){
    super(props)
    appInj.setLoading('Getting Fast History')
    GetFasts().then(res => {
      
      res.data
      .map((y:any) => {
        this.x.push(y)
        this.x.sort(
          function(a:any, b:any){
          if(a.startTime > b.startTime) { return -1; }
          if(a.startTime < b.startTime) { return 1; }
          return 0;
          }
        );
        return this.x
      })
      this.forceUpdate()
      appInj.setLoading('')
    })
    
  }

  lengthOfFast(dur:any, type: any)
  {
    if(type !== undefined && dur !== undefined)
    {
      //console.log(dur, "dur", type, "type")
      var diff = ( (dur)/ (type) )*100
      //console.log(diff.toFixed(2))
      return <div>
        <p>{`${diff.toFixed(2)}%`}</p>
      </div>
    }
  }

  render() {
    return (
      <div>
        <h1 className="mainH1">Your fast History</h1>
        <div key={generator()}>
              
                <table key={generator()}>
                <thead>
                  <tr>
                  <th key={generator()}>start Time</th>
                  <th key={generator()}>end Time</th>
                  <th key={generator()}>duration</th>
                  <th key={generator()}>Completion Level</th>
                  <th key={generator()}>type of fast</th>
                  <th key={generator()}>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {this.x.map(item =>  (
                    <React.Fragment key={generator()}>
                      <tr>
                      <td key={generator()}>{moment(item.startTime).format('lll')}</td>
                      <td key={generator()}>{moment(item.endTime).format('lll')}</td>
                      <td key={generator()}>{(item.duration)} Hours</td>
                      <td key={generator()}>{this.lengthOfFast(item.duration, item.typeofFast.lengthofFast)}</td>
                      <td key={generator()}>{item.typeofFast.name}</td>
                      <td key={generator()}><Link to={`/fastEdit/${item._id}/${JSON.stringify(item)}`}>Edit </Link></td>
                    </tr>
                    </React.Fragment>
                  ))} 
                </tbody>
              </table>
            </div>
      </div>
    )
  }
}


