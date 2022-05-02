import React from 'react'
import { appInj } from '../../Services/tools';
import { Spinner } from '../../Theme/ThemeService';




class TestPage extends React.Component  {
  
  render() {
    return (
      <div>
        
        <h1>Test Page </h1>
        <h1>Loading screen button</h1>
        <button onClick={()=>appInj.setLoading('Test')} >
        Test loading
        </button>
        <hr/>
        {Spinner()}
        <hr/>

      </div>
    )
  }
}

export default TestPage
