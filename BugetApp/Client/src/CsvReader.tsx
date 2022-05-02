import React, { Component } from 'react'
import LocalStorage from './LocalStorage';
import { iExpense } from './interfaces';
import { generator } from './UtilFunc';

export default class CsvReader extends Component {

    LS = new LocalStorage("Buget", "Expense_Savings")

    Data: iExpense[] = []
    names:string[] = []

    readCSV(){
        return <input type="file" onChange={e=>{
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
            // console.log(entry)
            this.forceUpdate()
            // console.log("data : ",d)
            this.names = this.sortRawCsvData(d)
            this.forceUpdate()
            return this.names
        }
        
        });
        var dataUse = Object.assign(d)
        this.forceUpdate()
        this.Data = dataUse
        return this.Data
    };

    sortRawCsvData(data:any){
        var typeArray:any[] = []
        var sortedArray:any[] = []
         //console.log(item.Description)
         data.forEach((el:any) => {
            var search = el.Description
            //console.log(search)
            typeArray.push(search)
            return typeArray.sort(( a, b ) => a > b ? 1 : -1 ) 
        });
        sortedArray = typeArray.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })
        console.log("sortedArray: ", sortedArray)
       return sortedArray
    }

    displayCsvDataTable(data){
        //console.log(data)
        var headers = data.slice(0,3)
        var body = data.slice(2)
        // console.log("headers",headers)
        // console.log("body",body)
        
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

    BreakdownViewOfData(namesArray: string[], data:iExpense[])
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
             <h1 key={generator()}>Break Down View of Types </h1>
             <div key={generator()}>{items} </div>
        </div>
    }

    SaveCsvData(data: any){
        this.LS.AddToLocalStorage(data)
    }

    render() {
    return (
      <div>
        {this.readCSV()}
        {this.displayCsvDataTable(this.Data)}
        {this.BreakdownViewOfData(this.names, this.Data)}
        
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
