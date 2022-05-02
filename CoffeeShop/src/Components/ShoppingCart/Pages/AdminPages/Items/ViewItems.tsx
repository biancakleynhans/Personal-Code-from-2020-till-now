import React from 'react'
import { GetInvItem } from '../../../../../Services/ConectToServerServices';
import { iItem } from '../../../Models/AdminModels';
import { Link } from 'react-router-dom';
import {generator} from '../../../../../Services/tools'


class ViewItemPage extends React.Component {

  x:any[] = []
  constructor(props:any){
    super(props)
    GetInvItem().then(res => {
      res.data
      .map((y:iItem) => {
        console.log(y, "res from server")
        return this.x.push(y)
      })
      this.forceUpdate()
    })
  }


  render() {
    return (<div key={generator()}>
              <h1 className="mainH1">View Items Page</h1>
                <table key={generator()}>
                <thead>
                  <tr>
                  <th key={generator()}>Name</th>
                  <th key={generator()}>Item Cost</th>
                  <th key={generator()}>Portion Size</th>
                  <th key={generator()}>Prep Methods</th>
                  <th key={generator()}>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {this.x.map(item =>  (
                    <React.Fragment key={generator()}>
                      <tr>
                      <td key={generator()}>{item.Name}</td>
                      <td key={generator()}>R {item.ItemCost}</td>
                      <td key={generator()}>{item.PortionSize} {item.PortionValue}</td>
                      <td key={generator()}>{item.PrepMethod}</td>
                      <td key={generator()}>
                        <Link key={generator()} to={`/editItem/${item._id}/${item.Name}/${item.ItemCost}/${item.PortionSize}/${item.PortionValue}/${JSON.stringify(item.PrepMethod)}`}>
                          Update
                        </Link> 
                      </td>
                    </tr>
                    </React.Fragment>
                  ))} 
                </tbody>
              </table>
            </div>)
  }
}

export default ViewItemPage
