import React, { Component } from 'react'
import { IProps, IStates } from './004_UserRenameDesc'
import {RouteComponentProps} from 'react-router-dom' 
import { generator } from '../../Util/UtilFunc'
import { iExpense } from '../Models/interfaces'

function BreakdownViewOfData(namesArray: string[], data:iExpense[])
{
    const items = []
    for(let i = 0; i < namesArray.length; i++){
        //console.log(namesArray[i], "name???") 
        
        var entry = data.slice(3).filter(ent => ent.Description === namesArray[i])
        //console.log(entry, "entry???")

        // MONEY IN
        // creates an array of the `number` property: [100, 22, 12]
        var numbersIn = entry.map(i => Number(i.MoneyIn));
        // console.log("numbersIn", numbersIn)

        // gets the sum of the array of numbers: 134
        var sumIn = numbersIn.reduce((a, b) => a + b, 0);
        // console.log("sumIn total???",sumIn)

        // MONEY OUT 
        // creates an array of the `number` property: [100, 22, 12]
        var numbersOut = entry.map(i => Number(i.MoneyOut));
        // console.log("numbersOut",numbersOut)
        
        // gets the sum of the array of numbers: 134
        var sumOut = numbersOut.reduce((a, b) => a + b, 0);
        // console.log("sumOut total???",sumOut)

        items.push(
            <div key={generator()}>
                <p key={generator()}>
                    Type: {namesArray[i]} <br/>
                    Money In Total: {sumIn} <br/>
                    Money Out Total: {sumOut} <br/>
                </p>
            </div>
        )
    }

    return <div key={generator()}>
          <div key={generator()}>{items} </div>
    </div>
}

export default  class ViewTransactionsBreakDown extends Component<IProps & RouteComponentProps, IStates> {

  constructor(props){
    super(props)
    this.state = {
      desc: this.props.location.state.data,
      redirect: false,
      nameArr: this.props.location.state.nameArr
    }
    console.log(this.props.location, "???? props")
  }

  render() {
    return (
      <div>
          {BreakdownViewOfData(this.state.nameArr, this.state.desc)}
      </div>
    )
  }
}

