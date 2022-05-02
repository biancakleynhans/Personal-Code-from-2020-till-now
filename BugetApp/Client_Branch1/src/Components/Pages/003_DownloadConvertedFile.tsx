import React, { Component } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import { IProps, IStates } from './004_UserRenameDesc'

export default class DownloadConvertedFile extends Component<IProps & RouteComponentProps, IStates>  {
  
  constructor(props){
    super(props)
    this.state = {
      desc: [],
      redirect: false,
    }
    console.log(this.props, "???? props")
  }
  render() {
    return (
      <div>
        <h1>Would you like to download your converted pdf </h1>
      </div>
    )
  }
}
