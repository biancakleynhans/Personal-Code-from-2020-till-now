import * as React from 'react'
import { GetCatagoryItemNotlogged } from '../../../../Services/ConectToServerServices';
import { iCatagory } from '../../Models/AdminModels';
import { Link } from 'react-router-dom';
import {generator} from '../../../../Services/tools'

class ViewShopNotLogedIn extends React.Component {
    x:any[] = []
    hide:boolean = false
    constructor(props:any)
    {
        super(props)
        GetCatagoryItemNotlogged().then(res => {
            res.data.map((y:iCatagory) => {
              //console.log(y, "res from server")
              return this.x.push(y)
            })
            this.forceUpdate()
          })
    }
  render() {
    return (
        <div key={generator()}>
        <h1>Menu </h1>
        <Link key={generator()} to="/login">Please Log In to Order</Link>
        {
            this.x.map((e:any)=> {
                console.log(e, "??")
                return <div key={generator()}>
                    <h1>{e.Name}</h1>
                    {   // eslint-disable-next-line
                        e.Products.map((i:any)=>{
                            if(e.Name === "Toasties")
                            {
                                return <table key={generator()} >
                                    <thead>
                                    <tr>
                                        <th>Name and Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td key={generator()}>{i.Name} &emsp; &emsp; &emsp; R{i.Price}</td>
                                    </tr> 
                                    </tbody>
                                </table> 
                            }
                            else if(e.Name === "From The Barista")
                            {
                                return <table key={generator()} >
                                    <thead>
                                    <tr>
                                        <th>Name and Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td key={generator()}>{i.Name} &emsp; &emsp; &emsp; R{i.Price}</td>
                                    </tr> 
                                    </tbody>
                                </table>
                                
                            }
                            else if(e.Name !== "Toasties")
                            {
                                return <table key={generator()}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td key={generator()}>{i.Name} &emsp; &emsp; &emsp; R{i.Price}</td>
                                    <td key={generator()}>{i.Description}</td>
                                </tr> 
                                </tbody>
                                </table>
                            }
                            
                        })
                    }
                </div>
            })    
        }  
        </div>
    )}
}

export default ViewShopNotLogedIn
