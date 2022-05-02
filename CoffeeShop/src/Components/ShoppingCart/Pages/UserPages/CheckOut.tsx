import React from 'react'
import { GetOrder, getUser, AddOrderDelivery } from '../../../../Services/ConectToServerServices';
import Select from 'react-select';
import { generator } from '../../../../Services/tools';
import { Checkout } from '../../Models/AdminModels';
import { withFormik} from "formik";
import { FormikProps } from "formik";
import { OtherProps } from '../../Models/PropsForForms';
import { iOrder } from '../../Models/UserModels';
import { FormPropsOrder } from '../../Models/PropsForForms';



function Total(arrToReduce: any)
{
  const total = arrToReduce.reduce((acc:any, item:any) => acc + item.ProdPrice, 0);
  console.log(total, "???? total")
  return total
}

export default class CheckOutPage extends React.Component{
  del = ""
  pay=""
  x:any[] = []
  finalOrderProd: string[] = []
  finalContent: string[] = []
  finalContentPrep: any[] = []
  user: any 
  

  constructor(props:any){
    super(props)
    GetOrder().then(res => {
      res.data.map((y:any) => {
        return this.x.push(y)
      })
      this.forceUpdate()
      res.data.map((y:any) => {
        return this.finalContent.push(y.Content)
      })
      this.forceUpdate()
      res.data.map((y:any) => {
        return this.finalContentPrep.push(y.ContentPrep)
      })
      this.forceUpdate()
      res.data.map((y:any) => {
        return this.finalOrderProd.push(y.ProdName)
      })
    })
    this.user = getUser()
    
  }

  InnerFormCheckOut = (props: OtherProps & FormikProps<iOrder>) => {
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        title = 'Check Out and Payment',
        buttonText= 'Complete'
    } = props;
  
    function setter(user:any, finalContent:any, finalContentPrep:any, finalOrderProd:any)
    {
      values.OrderName = user.firstName
      values.OrderAdress = user.adress
      values.OrderContact = user.celNum
      values.ProdPerOrder = finalContent
      values.OrderProductsprepM = finalContentPrep
      values.OrderProducts = finalOrderProd
    }
    
    return (
        <div className="form-style">
          {setter(this.user, this.finalContent, this.finalContentPrep, this.finalOrderProd)}
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
            <h2>R {Total(this.x)} is total of you cart </h2>
            <h3>Your order is: </h3>
            <div>
              {this.x.map((item:any)=>{
                //console.log(item, "item")
                return <div>
                  <p><strong>{item.ProdName}</strong> {item.ProdPrice} <br/></p>
                  <p>{item.ContentPrep} {item.Extras}</p>
                </div>
              })}
            </div>
            <h3>Please select Delivery Option</h3>
            <Select 
              key={generator()}
              inputId={generator()} 
              value={values.PickOrDel} 
              isMulti
              onChange={(e:any)=>{
                values.PickOrDel = e
                console.log('Select onChange',e);
                handleChange(e)
                handleBlur(e)
                this.forceUpdate();
              }} 
              styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
              options={Checkout.PickDel}
              getOptionLabel={options => options}
              getOptionValue={options => options} 
            />
            <h3>Please select Payment Option</h3>
            <Select 
              key={generator()}
              inputId={generator()} 
              isMulti
              value={values.PaymentMethod} 
              onChange={(e:any)=>{
                values.PaymentMethod = e
                  console.log('Select onChange',e);
                  this.forceUpdate();
              }} 
              styles={{container:(p)=>({...p,color:'black',minWidth:'180px'})}}  
              options={Checkout.Payment}
              getOptionLabel={options => options}
              getOptionValue={options => options} 
            />
              <button type="submit" >{buttonText}</button>
            </form>
        </div> 
    );
  };

  CheckOutForm = withFormik<FormPropsOrder, iOrder>({
    mapPropsToValues: props => ({
      OrderName:          props.initialOrderName          ||"",
      OrderAdress:        props.initialOrderAdress        ||"",
      OrderContact:       props.initialOrderContact       ||"",
      OrderProducts:      props.initialOrderProducts      ||[],
      OrderProductsprepM: props.initialOrderProductsprepM ||[],
      PickOrDel:          props.initialPickOrDel          ||"",
      PaymentMethod:      props.initialPaymentMethod      ||"",
      POP:                props.initialPOP                ||"",
    }),
    handleSubmit({ OrderName,OrderAdress,OrderContact,OrderProducts,OrderProductsprepM,PickOrDel,PaymentMethod,POP,ProdPerOrder }: iOrder,{ setSubmitting, resetForm }) {
      console.log( OrderName,OrderAdress,OrderContact,OrderProducts,OrderProductsprepM,PickOrDel,PaymentMethod,POP,ProdPerOrder, "FormValues");
      // Add send to server request here to check info 
      const obj = {OrderName,OrderAdress,OrderContact,OrderProducts,OrderProductsprepM,PickOrDel,PaymentMethod,POP,ProdPerOrder}
      AddOrderDelivery(obj)
      setSubmitting(false)
      resetForm(undefined)
      window.alert("your order has been sent to the shop")
      window.location.replace('/shop')
    }
  })(this.InnerFormCheckOut);

  render() {
    return (<div> <this.CheckOutForm></this.CheckOutForm>  </div>)
  }
}
