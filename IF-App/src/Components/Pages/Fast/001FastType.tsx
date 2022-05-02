import React from 'react'
import { typeOfFastTime} from '../../Models/FastModels';
import { generator } from '../../Util/tools';
import { SetFastType } from '../../Util/FastUtil';
import { getType, setType, removeType } from '../../Cache/FastCache';
import { Link } from 'react-router-dom';


export default  class FastTypeSelectPage extends React.Component {
 
  GetType()
  {
    var x = getType()
    if(x === undefined)
    {
      //console.log(x, "is get type info")
      return <div> 
          No Fast Type Defined yet. <br/> <br/>
          Please define the type you would like <br/> <br/>
          If you would like to build a custom fast please select custom <br/> <br/>
          
          <select onClick={this.getSelected}>
              {typeOfFastTime.fastTypeTimes.map((i:any)=> {return <option key={generator()} value={i}>{i}</option>})}
          </select> <br/>
          
          <p>Build a custom fast </p>
          <input placeholder='Length of Custom fast' type="number" onChange={this.CustomType}/> <br/><br/>

          <Link to='/fastTimer'>Done </Link>
      </div>
    }
    if(x !== undefined)
    {
      //console.log(x, "is get type info"); 
      return <div>
        <p>name: {x.name}</p>
        <p>lengthofFast: {x.lengthofFast}</p>
        <p>nonFastingTime: {x.nonFastingTime}</p>

        <button className="btn" onClick={this.resetType}>Change Fast Type </button>
      </div>
    }
  }

    
  getSelected(e:any)
  {
    //console.log(SetFastType(e.target.value),"???");
    removeType()
    return setType(SetFastType(e.target.value))
    
  }


  CustomType(i:any)
  {
    //console.log(SetFastType('custom', i.target.value), 'input')
    removeType()
    return setType(SetFastType('custom', i.target.value))
  }

  resetType()
  {removeType(); window.location.reload()}

  render() {
    return (
      <div>
        <h1>Fast Timer Selector</h1>
        {this.GetType()}
        
      </div>
    )
  }
}

