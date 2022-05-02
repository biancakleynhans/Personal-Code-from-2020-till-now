import React, { Component } from 'react'
import { iUserInfo } from './000UserInputInnerForm';
import { GetUii } from '../../../Services/ConectToServerServices';
import moment from 'moment'

export default class UserInfoDisplay extends Component {

    userInfo: iUserInfo = {date:new Date(), weight:0, height:0, age: 0, sex: "", bmr:0, bmi:0, activeLevel: "", calReq: 0}
    
    componentWillMount()
    {
      // this.userInfo = getUserINFO()
      // console.log(this.userInfo, "user Info")

      GetUii().then((res:any)=> {
        var x = res.data[0]
        //console.log(x, "res")
        this.userInfo = x
        this.forceUpdate()
        //console.log(this.userInfo.date, "res")
        return this.userInfo
      })
      //this.forceUpdate()
     
    }
  render() {
    return (
      <div>
        <h1>User Info At a Glance</h1>
        <p>Date: {moment(this.userInfo.date).format('lll')}</p>
        <p>Weight: {this.userInfo.weight} Kg</p>
        <p>Height: {this.userInfo.height} Cm</p>
        <p>Age: {this.userInfo.age} Years</p>
        <p>Gender: {this.userInfo.sex}</p>
        <p>bmi: {this.userInfo.bmi}</p>
        <p>bmr: {this.userInfo.bmr}</p>
        <p>Active Level: {this.userInfo.activeLevel}</p>
        <p>Required Calories: {this.userInfo.calReq} Cal Needed</p>
      </div>
    )
  }
}
