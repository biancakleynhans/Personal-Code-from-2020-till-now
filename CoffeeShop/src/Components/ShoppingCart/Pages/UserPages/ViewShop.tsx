import * as React from 'react'
import { GetOrder, GetCatagoryItem } from '../../../../Services/ConectToServerServices';
import { iCatagory } from '../../Models/AdminModels';
import { Link } from 'react-router-dom';
import {generator} from '../../../../Services/tools'


class ViewShop extends React.Component {
    x:any[] = []
    count: number = 0 
   
    constructor(props:any)
    {
        super(props)
        GetCatagoryItem().then(res => {
            res.data.map((y:iCatagory) => {
              //console.log(y, "res from server")
              return this.x.push(y)
            })
            this.forceUpdate()
        })
        GetOrder().then((res)=> {
            let counter =  res.data.length
            this.count = counter
            this.forceUpdate()
            return this.count
        })
        console.log(this.count,' count')
          
    }
  render() {
    return (
      <div>
            <h1>Menu </h1>
            <Link to="/Cart">Cart {this.count}</Link>
            {
                this.x.map((e:any)=> {
                    //console.log(e, "catagory Map")
                    return <div key={generator()}>
                        <h1>{e.Name}</h1>
                        {
                            e.Products.map((i:any)=>{
                                return <table key={generator()}>
                                <thead>
                                <tr key={generator()}>
                                    <th key={generator()}>Name and Price</th>
                                    <th key={generator()}>Add To Cart</th>
                                </tr>
                                </thead>
                                <tbody>
                                <React.Fragment key={generator()}>
                                    <tr key={generator()}>
                                        <td key={generator()}>{i.Name} &emsp; &emsp; &emsp; R{i.Price}</td>
                                        <td key={generator()}>
                                            <Link key={generator()}  to={`/addToCart/${e.Name}/${JSON.stringify(i)}`}> 
                                                Order&emsp; &emsp;
                                            </Link>
                                        </td>
                                    </tr> 
                                </React.Fragment>
                                </tbody>
                            </table> 
                            })
                        }
                    </div>
                })    
            }  
      </div>
    )}
}

export default ViewShop
