import React, { Component } from 'react'
import { iExpense } from '../Models/interfaces';
import UserRenameDescriptions from './004_UserRenameDesc';


export default class CsvReader extends Component {

    Data: iExpense[] = undefined
 
    readCSV(){
        return <div>
            <h1>Please select a csv file to upload</h1>
             <input type="file" onChange={e=>{
            var f=e.target.files && e.target.files[0];
            if(f)
            {
              var fr=new FileReader();
              fr.onloadend=() => {
                if (typeof (fr.result) == 'string') {
                    var str: string = fr.result || '';
                    // console.log("str",str )
                  
                    var byline = str.split("\r").join("").split("\n").reduce((s, c) => {
                    s.push(c.split('"').join("").split(",").map(o => o.trim()));
                    
                    return s;
                  }, [] as string[][]);
                  if (byline !== undefined) {
                      
                    this.handleCsvInput(byline);
                    this.forceUpdate()
                  }
                  if (byline === undefined) {
                    window.alert("Seems to have a problem please check file again");
                  }
                }
              }
              fr.readAsText(f);
            }
          }} />
        </div>
  
    }

    handleCsvInput = (data:any) => {
        // console.log("data: ",data)
        var d = []
        data.forEach((el: any) => {
        //console.log(el)
        if(el.length > 1)
        {
            var entry = {
                "PostingDate": el[0],  
                "TransactionDate": el[1],
                "Description": el[2],
                "MoneyIn": el[3].split(' ').join(''),
                "MoneyOut": el[4].split(' ').join(''),
                "Balance": el[5].split(' ').join('')
            }
            d.push(entry)
            // console.log(d)
            this.forceUpdate()
            return d
        }
        
        });
        var dataUse = Object.assign(d)
        this.forceUpdate()
        this.Data = dataUse
        return this.Data
    };

    editDiscNames(data){
      // console.log("data",data) 
      return <UserRenameDescriptions {...data}/>
    }

    LoadOrEdit(data){
        // console.log('data',data)
        const trigger = data;
        if (trigger !== undefined) {
          return this.editDiscNames(data);
        }
      return this.readCSV();
    }

    render() {
    return (
      <div>
        {this.LoadOrEdit(this.Data)}
    </div>
    )
  }
        
}


// 0: Banking App Cash Sent
// 1: Banking App Payment Y Kruger
// 2: Banking App Transfer from Savings Account
// 3: Banking App Transfer to Savings Account
// 4: Cash Sent Fee
// 5: Interest Received
// 6: Payment Fee
