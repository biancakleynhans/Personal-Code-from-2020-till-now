import React from 'react'
import Select from 'react-select';
import { GetInvItem } from '../../Services/ConectToServerServices';
import { iItem } from '../ShoppingCart/Models/AdminModels';
import { NamedDict, NamedDictKeyValues } from '../../Services/tools';


interface iSelectOpts{
    getItems:()=>any[],
    isMulti?:boolean
}

type iField={title:string,val:any,type:'text' | 'date' | 'number' | 'select', selectOpts?:iSelectOpts}

function  S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generator(): string {
    const isString = `${S4()}${S4()}`;  //-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}
    return isString;
}


export  class Testform extends React.Component<{id:string,fields:NamedDict<iField>, onSubmit:()=>void}>
{ 
    render()
    { return <form 
                className="form-style"
                id={this.props.id} 
                action="post" target="/" 
                onSubmit={e=>{ e.preventDefault();this.props.onSubmit()}}  
            >
    { NamedDictKeyValues(this.props.fields).map(field=>{
        return <div>
                    <label htmlFor={field.k} >{field.v.title}</label>  
                    
                    {field.v.selectOpts && 
                        <div style={{display:'inline-block'}}>
                            <Select 
                                key={generator()}
                                inputId={generator()}
                                isMulti={field.v.selectOpts.isMulti} 
                                value={field.v.val} 
                                onChange={(e:any)=>{
                                    console.log('Select onChange',e);
                                    field.v.val = e;
                                    this.forceUpdate();
                                }} 
                                styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
                                options={field.v.selectOpts.getItems()}
                                getOptionLabel={options => options}
                                getOptionValue={options => options} 
                            />
                        </div>
                    } 

                    
                    {field.v.type !=='select' &&
                        <input 
                            key={generator()}
                            name={field.k} 
                            value={field.v.val} 
                            type={field.v.type}
                             onChange={e=>{
                                 field.v.val=e.target.value;
                                 this.forceUpdate();}
                        }/>
                    }
            </div>      
        })
    }<button className="form-style" type='submit' >Submit</button>
    </form>}
}

 
export default class FormBase extends React.Component {

    xListForItem:any[] = []
    list:any[] = []
    constructor(props:any)
    {
        super(props)
        GetInvItem().then(res => {
            res.data
            .map((y:iItem) => {
            //console.log(y, "res from server")
            return this.xListForItem.push(y)
            })
            this.forceUpdate()
        })
    }

    formFields:NamedDict<iField> = {
        'field1':       {title:'My test Field',    type:'text',    val:''},
        'field2':       {title:'Test field 2',     type:'number',  val:0},
        'selectField1': {title:'Test Select ',      type:'select',  val:'',  
            selectOpts:{
                isMulti:true,
                getItems: ()=> this.xListForItem.map((i:any)=> {
                    return i.Name
                })
            }
        }
    }

    SubmitForm():void
    {
        console.log(this.formFields, "form on submit")
        //this.xListForItem.map((item:any)=> {})
        
    }

    render() {
        return (
        <div>
            <Testform id={'test'} fields={this.formFields} onSubmit={()=> this.SubmitForm()} />
        </div>
        )
    }
}
