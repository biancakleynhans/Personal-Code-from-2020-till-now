import React, { Component } from 'react'
import { GetOrder, DeleteOrder } from '../../../../Services/ConectToServerServices';
import { generator } from '../../../../Services/tools';
import { Link } from 'react-router-dom';

class ViewCartItems extends Component {
  x:any[] = []
  constructor(props:any){
    super(props)
    GetOrder().then(res => {
      res.data.map((y:any) => {
        console.log(y, "res from server")
        return this.x.push(y)
      })
      this.forceUpdate()
      sortArray(this.x)
      this.forceUpdate()
    })
  }


  render() {
    return (<div key={generator()}>
              <h1 className="mainH1">Cart</h1>
              <p>Total Cost Of cart R {Total(this.x)}</p><br/>
              <Link key={generator()} to={"/shop"}>Return to store</Link><br/>
                <table>
                <thead>
                  <tr>                 
                  <th key={generator()}>Name</th>
                  <th key={generator()}>Price </th>
                  <th key={generator()}>Instructions</th>
                  <th key={generator()}></th>
                  </tr>
                </thead>
                <tbody>
                  {this.x.map(item =>  (
                    <React.Fragment key={generator()}>
                      <tr>
                        <td key={generator()}>{item.ProdName}</td>
                        <td key={generator()}>R {item.ProdPrice}</td>
                        <td key={generator()}> {item.ContentPrep}, {item.Extras.map((i:any) => {return <p key={generator()}>{i}</p>})} </td>
                        <td key={generator()}><button onClick={()=> {DeleteOrder(item._id)}}>Remove</button></td>
                      </tr>
                    </React.Fragment>
                  ))} 
                </tbody>
              </table>
              <br/><br/>
              <Link key={generator()} to={"/checkOut"}>CheckOut</Link>
            </div>)
  }
}

export default ViewCartItems

function sortArray(Order:any): any[]
{
  var SortedContent
  Order.sort(
    function(a:any, b:any){
    if(a.Name < b.Name) { return -1; }
    if(a.Name > b.Name) { return 1; }
    return 0;
    }
  );
  SortedContent = Order
  //console.log(SortedContent, 'SortedContent')
  return SortedContent
}

function Total(arrToReduce: any)
{
  const total = arrToReduce.reduce((acc:any, item:any) => acc + item.ProdPrice, 0);
  console.log(total, "???? total")
  return total
}

