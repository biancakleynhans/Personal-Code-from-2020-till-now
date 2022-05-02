import React from 'react'
import {GetCatagoryItem } from '../../../../../Services/ConectToServerServices';
import { iCatagory } from '../../../Models/AdminModels';
import { Link } from 'react-router-dom';
import {generator} from '../../../../../Services/tools'


class ViewCatagoryPage extends React.Component {

  x:any[] = []
  constructor(props:any){
    super(props)
    GetCatagoryItem().then(res => {
      res.data
      .map((y:iCatagory) => {
        console.log(y, "res from server")
        return this.x.push(y)
      })
      this.forceUpdate()
    })
  }


  render() {
    return (<div key={generator()}>
              <h1 className="mainH1">View Catagory Page</h1>
                <table>
                <thead key={generator()}>
                  <tr>
                  <th key={generator()}>Name</th>
                  <th key={generator()}>Content</th>
                  <th key={generator()}>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {this.x.map(item =>  (
                    <React.Fragment key={generator()}>
                      <tr>
                      <td key={generator()}>{item.Name}</td>
                      <td  key={generator()}>
                        {item.Products.map((content: any)=> {
                            //console.log(content, "content")
                            return <div key={generator()}>
                              {content.Name}
                            </div>
                        })}
                      </td>
                      <td key={generator()}>
                        <Link key={generator()} to={`/editCatagory/${item._id}/${item.Name}/${JSON.stringify(item.Products)}`}>
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

export default ViewCatagoryPage
