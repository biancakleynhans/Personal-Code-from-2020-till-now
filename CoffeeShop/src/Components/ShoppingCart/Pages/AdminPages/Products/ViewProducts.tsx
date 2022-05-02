import React from 'react'
import { GetProdItem } from '../../../../../Services/ConectToServerServices';
import { iItem } from '../../../Models/AdminModels';
import { Link } from 'react-router-dom';
import {generator} from '../../../../../Services/tools'


class ViewProductPage extends React.Component {

  x:any[] = []
  constructor(props:any){
    super(props)
    GetProdItem().then(res => {
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
              <h1 className="mainH1">View Products Page</h1>
                <table key={generator()}>
                <thead>
                  <tr>
                  <th key={generator()}>Name</th>
                  <th key={generator()}>Price</th>
                  <th key={generator()}>Description</th>
                  <th key={generator()}>Content</th>
                  <th key={generator()}>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {this.x.map(item =>  (
                    <React.Fragment key={generator()}>
                      <tr>
                      <td key={generator()}>{item.Name}</td>
                      <td key={generator()}>R {item.Price}</td>
                      <td key={generator()}>{item.Description}</td>
                      <td  key={generator()}>
                        {item.Content.map((content: any)=> {
                            //console.log(content, "content")
                            return <div key={generator()}>
                              {content.Name}
                            </div>
                        })}
                      </td>
                      <td key={generator()}>
                        <Link key={generator()}  to={`/editProduct/${item._id}/${item.Name}/${item.Price}/${item.Description}/${JSON.stringify(item.Content)}`}>
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

export default ViewProductPage
