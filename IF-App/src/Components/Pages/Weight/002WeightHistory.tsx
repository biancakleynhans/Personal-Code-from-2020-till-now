import React from 'react'
import { GetWeight } from '../../../Services/ConectToServerServices';
import { generator, appInj } from '../../Util/tools';
import moment  from 'moment'

export default class WeightHistory extends React.Component {
  x:any[] = []
 
  constructor(props:any){
    super(props)
    appInj.setLoading('Getting Weight History')
    GetWeight().then(res => {
      res.data
      .map((y:any) => {
        this.x.push(y)
        this.x.sort(
          function(a:any, b:any){
          if(a.date > b.date) { return -1; }
          if(a.date < b.date) { return 1; }
          return 0;
          }
        );
        console.log(this.x, "???")
        return this.x
      })
      this.forceUpdate()
      appInj.setLoading('')
    })
    
  }

  render() {
    return (
      <div>
        <h1 className="mainH1">Your fast History</h1>
        <div key={generator()}>
                <table key={generator()}>
                <thead>
                  <tr>
                  <th key={generator()}>Date</th>
                  <th key={generator()}>weight</th>
                  <th key={generator()}>bodyFat</th>
                  <th key={generator()}>muscleMass</th>
                  <th key={generator()}>waterDensity</th>
                  <th key={generator()}>boneDensity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.x.map(item =>  (
                    <React.Fragment key={generator()}>
                      <tr>
                      <td key={generator()}>{moment(item.date).format('lll')}</td>
                      <td key={generator()}>{item.weight} Kg</td>
                      <td key={generator()}>{item.bodyFat} %</td>
                      <td key={generator()}>{item.muscleMass} % </td>
                      <td key={generator()}>{item.waterDensity} % </td>
                      <td key={generator()}>{item.boneDensity} % </td>
                      {/* <td key={generator()}><Link to={`/fastEdit/${item._id}/${JSON.stringify(item)}`}>Edit </Link></td> */}
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

