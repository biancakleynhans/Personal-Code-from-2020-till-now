import React, { Component} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import { MyForm } from './004_InnerformUserRenameDesc';
import {Redirect}from 'react-router-dom'

export function  sortRawCsvData(data:any){
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
  // console.log("sortedArray: ", sortedArray)
  return sortedArray
}

export default class UserRenameDescriptions extends Component<IProps & RouteComponentProps, IStates> {

  DescArray: any[] = []
  DataArrayRecieved: any[] =[]
  UpdatedDescArray: any[] =[]
  myController = new AbortController();

  constructor (props) {
    super(props)
    console.log("Main props",props)  //acess as props[0].PostingDate
    Object.keys(props).map((lineIndex, lineValue)=>{
      // console.log("line", lineIndex, props[lineValue])
      this.DataArrayRecieved.push(props[lineValue])
      return this.DataArrayRecieved
    })
    // console.log("this.DataArrayRecieved", this.DataArrayRecieved)
    this.DescArray = sortRawCsvData(this.DataArrayRecieved) 
    
    this.state = {
      desc: this.DescArray,
      redirect: false,
      display: "Table",
      nameArr: []
    }
  }

 
  myCallback = (dataFromChild) => {
    var childResponse = dataFromChild[0].vehicles
    // console.log("this.DescArray", this.DescArray)
    // console.log("dataFromChild", childResponse)
   
    for (let index = 0; index < this.DescArray.length; index++) {
      // console.log("index", index, this.DescArray[index])
      // console.log("index", index, childResponse[index])

      this.UpdatedDescArray = this.DataArrayRecieved.filter((item) => {
        if (item.Description === this.DescArray[index]) {
          item.Description = childResponse[index];
        }
        return item;
      });
    }
    // console.log("filteredDataSource",this.UpdatedDescArray);
    window.localStorage.setItem("DataArray", JSON.stringify(this.UpdatedDescArray))
    this.setState({redirect:true, display: "Table",desc: this.UpdatedDescArray})
    // this.setState({redirect:true, display: "BreakDown", nameArr: childResponse, desc: this.UpdatedDescArray})
    return this.UpdatedDescArray
  }


  render () {
    
    if (this.state.redirect === true && this.state.display === "Table") 
    {
      return <Redirect
      to={{
        pathname: '/viewTable',
        state: { data: this.UpdatedDescArray }
      }}
      />
    }
    if (this.state.redirect === true && this.state.display === "BreakDown") 
    {
      return <Redirect
      to={{
        pathname: '/viewBreakdown',
        state: { data: this.UpdatedDescArray, nameArr: this.state.nameArr }
      }}
      />
    }
   
    return (
      <div>
        <h2>Please Edit the Descriptions <br/> then click rename and at the end click done </h2>
        <MyForm callbackFromParent={[this.DescArray,this.myCallback]}/>
      </div>
    );        
    
  }
}

export interface IProps extends RouteComponentProps<{desc:any}>{}
export interface IStates{desc:any, redirect?: boolean, display?: string, nameArr?: any}
