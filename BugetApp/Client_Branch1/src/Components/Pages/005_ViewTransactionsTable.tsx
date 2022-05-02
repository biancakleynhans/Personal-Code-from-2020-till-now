import React from 'react'
import { IProps, IStates } from './004_UserRenameDesc'
import {RouteComponentProps} from 'react-router-dom' 
import { generator } from '../../Util/UtilFunc'


function displayCsvDataTable(data){
    //console.log("data",data)
    var headers = data.slice(0,3)
    var body = data.slice(3)
    console.log("headers",headers)
    console.log("body",body)
    
    // eslint-disable-next-line
    var headerReturn = headers.map((h1)=> {
        // console.log(h1['PostingDate'], "????")
        if(h1['PostingDate'] === "Posting Date")
        {
            // console.log(h1, "???? Should be string")
            return <tr key={generator()}>
            <th key={generator()}>{h1.PostingDate}</th>
            <th key={generator()}>{h1.TransactionDate}</th>
            <th key={generator()}>{h1.Description}</th>
            <th key={generator()}>{h1.MoneyIn}</th>
            <th key={generator()}>{h1.MoneyOut}</th>
            <th key={generator()}>{h1.Balance}</th>
            </tr>
        }
    })

    var bodyReturn = body.map((b1)=>{
        // console.log(b1, "???? Should be string")
        return  <tr key={generator()}>
        <td key={generator()}>{b1.PostingDate}</td>
        <td key={generator()}>{b1.TransactionDate}</td>
        <td key={generator()}>{b1.Description}</td>
        <td key={generator()}>{b1.MoneyIn}</td>
        <td key={generator()}>{b1.MoneyOut}</td>
        <td key={generator()}>{b1.Balance}</td>
    </tr>
    
    })

    return (<div>
                <table id="test" key={generator()}>
                <thead key={generator()}>
                    {headerReturn}
                </thead>
                <tbody key={generator()}>
                    {bodyReturn}
                </tbody>
                </table>
            </div>
    )
    
}


export default  class ViewTransactionsTable extends React.Component<IProps & RouteComponentProps, IStates> {

  constructor(props){
    super(props)
    this.state = {
      desc: this.props.location.state.data,
      redirect: false
    }
    console.log(this.props.location.state.data, "???? props")
  }
  render() {
    return (
      <div>
        <h1>View Transactions Table</h1>
        {displayCsvDataTable(this.state.desc)}
      </div>
            
    )
  }
}
