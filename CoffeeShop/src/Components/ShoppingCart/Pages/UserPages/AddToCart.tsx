import React from 'react'
import { RouteComponentProps} from 'react-router-dom'
import Select from 'react-select'
import { generator } from '../../../../Services/tools'
import { TypeOption, Catagories, prepList } from '../../Models/AdminModels'
import { OtherProps, FormPropsProductOredered } from '../../Models/PropsForForms';
import { FormikProps, withFormik } from 'formik';
import { iProductOredered } from '../../Models/UserModels';
import { AddOrder } from '../../../../Services/ConectToServerServices';



export default class AddToCart extends React.Component<IProps, IStates> {
  toast:string = ''
  tomato:string = ''
  egg:string = ''
  extra: string = ''
  size: string = ''
  milk:string = ''
  flavS:string = ''
  
  constructor(props:any)
  {
    super(props)
    this.state = {
      catName: this.props.match.params.catName,
      item: JSON.parse(this.props.match.params.item)
    }
    console.log(this.state, "state")
  }

  InnerFormAddToCart = (props: OtherProps & FormikProps<iProductOredered>) => {
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        title = 'Please select Your desired Options ',
        buttonText= 'Add'
    } = props;

    function ShowExtra(catName:string, valueSet: any)
    {
      if(catName !== Catagories.barista)
      {
        return <Select 
          key={generator()}
          inputId={generator()}
          isMulti
          placeholder = "Would you like any extra's"
          value={values.Extras} 
          onChange={(e:any)=>{
            values.Extras = e
            console.log('Select onChange',e)
            handleChange(e)
            handleBlur(e)
            if(e !== prepList.addOnBrekkie[0])
            {
              console.log('extra',e)
              var ad = e.length*10
              console.log('ad = ',ad)
              return values.ProdPrice = values.ProdPrice + ad
            }// eslint-disable-next-line
            else {console.log('no extra',e); return values.ProdPrice = values.ProdPrice}

          }} 
          styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
          options={prepList.addOnBrekkie}
          getOptionLabel={options => options}
          getOptionValue={options => options} 
        />
      }
      else {return <div></div>}
    }

    return (
      <div className="form-style">
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
        {// eslint-disable-next-line
          this.state.item.Content.map((c:any, index:any)=>{
            // All food options
            if(this.state.catName !== Catagories.barista)
            {
              //console.log(c,"content to work with")
              var text = `How would you like Your ${c.Name}`
              if(c.Name === TypeOption.toast)
              {
                var prep0 = c.PrepMethod
                return <Select 
                  key={generator()}
                  inputId={generator()}
                  placeholder = {text}
                  value={this.toast} 
                  onChange={(e:any)=>{
                    this.toast = e;
                    console.log('Select onChange',this.toast);
                    this.forceUpdate();
                    handleChange(e)
                    handleBlur(e)
                    return values.ContentPrep.push(this.toast)
                  }} 
                  styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
                  options={prep0}
                  getOptionLabel={options => options}
                  getOptionValue={options => options} 
                />
              }
              if(c.Name === TypeOption.tomato)
              {
                var prep1 = c.PrepMethod
                return <Select 
                  key={generator()}
                  inputId={generator()}
                  placeholder = {text}
                  value={this.tomato} 
                  onChange={(e:any)=>{
                    this.tomato = e;
                    console.log('Select onChange',this.tomato);
                    this.forceUpdate();
                    handleChange(e)
                    handleBlur(e)
                    return values.ContentPrep.push(this.tomato)
                  }} 
                  styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
                  options={prep1}
                  getOptionLabel={options => options}
                  getOptionValue={options => options} 
                />
              }
              if(c.Name === TypeOption.egg)
              {
                var prep2 = c.PrepMethod
                return <Select 
                  key={generator()}
                  inputId={generator()}
                  placeholder = {text}
                  value={this.egg} 
                  onChange={(e:any)=>{
                    this.egg = e;
                    console.log('Select onChange',this.egg);
                    this.forceUpdate();
                    handleChange(e)
                    handleBlur(e)
                    return values.ContentPrep.push(this.egg)
                  }} 
                  styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
                  options={prep2}
                  getOptionLabel={options => options}
                  getOptionValue={options => options} 
                />
              }
              
            }
          
            // All drink options
            if(this.state.catName === Catagories.barista)
            {
              if(c.Name === TypeOption.espresso)
              {
                var prep4 = c.PrepMethod
                return <Select 
                  key={generator()}
                  inputId={generator()}
                  placeholder = "What size would you like"
                  value={this.size} 
                  onChange={(e:any)=>{
                    this.size = e;
                    console.log('Select onChange',this.size);
                    this.forceUpdate();
                    handleChange(e)
                    handleBlur(e)
                    return values.ContentPrep.push(this.size)
                  }} 
                  styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
                  options={prep4}
                  getOptionLabel={options => options}
                  getOptionValue={options => options} 
                />
              }
              if(c.Name === TypeOption.milk)
              {
                return <Select 
                  key={generator()}
                  inputId={generator()}

                  placeholder = "What type of milk would you like"
                  value={this.milk} 
                  onChange={(e:any)=>{
                    this.milk = e;
                    console.log('Select onChange',this.milk);
                    this.forceUpdate();
                    handleChange(e)
                    handleBlur(e)
                    return values.ContentPrep.push(this.milk)
                  }} 
                  styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
                  options={prepList.Milk}
                  getOptionLabel={options => options}
                  getOptionValue={options => options} 
                />
              }
              if(c.Name === TypeOption.flavoredSyrup)
              {
                var prep5 = c.PrepMethod
                return <Select 
                  key={generator()}
                  inputId={generator()}
                  placeholder = "What size would you like"
                  value={this.flavS} 
                  onChange={(e:any)=>{
                    this.flavS = e;
                    console.log('Select onChange',this.flavS);
                    this.forceUpdate();
                    handleChange(e)
                    handleBlur(e)
                    return values.ContentPrep.push(this.flavS)
                  }} 
                  styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
                  options={prep5}
                  getOptionLabel={options => options}
                  getOptionValue={options => options} 
                />
              }
            }
          })
        }

        {ShowExtra(this.state.catName, this.extra)}
      


          {/* {errors.Name && <div>{errors.Name}</div>} */}
          {/* disabled={isSubmitting ||!!(errors.Name && touched.Name)} */}
          <button type="submit" >{buttonText}</button>
        </form>
      </div> 
    );
  };

  AddToCartForm = withFormik<FormPropsProductOredered, iProductOredered>({
    mapPropsToValues: props => ({
      ProdName:  this.state.item.Name,
      ProdPrice:  this.state.item.Price,
      Content: this.state.item.Content,
      ContentPrep: props.initialContentPrep || [],
      Extras: props.initialExtras||[]
    }),
    handleSubmit({ProdName, Content, ContentPrep, Extras,ProdPrice}: iProductOredered,{ props, setSubmitting, setErrors, resetForm }) {
      console.log(ProdName, Content, ContentPrep, Extras,ProdPrice,"FormValues")
      
      // Add send to server request here to check info 
      const obj = {ProdName, Content, ContentPrep, Extras,ProdPrice}
      AddOrder(obj)
      setSubmitting(false)
      resetForm(undefined)
      window.location.replace('/cart')
    }
  })(this.InnerFormAddToCart);

  render() {
    return (
      <div>
        <h2>{this.state.item.Name}</h2>
        <this.AddToCartForm></this.AddToCartForm>
    </div>
    )
  }
}



interface IProps extends RouteComponentProps<{ catName: string, item: string}>{}
interface IStates{catName: string, item:any}