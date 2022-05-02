import * as React from 'react'
import { OtherProps } from "../../../Models/PropsForForms";
import { iProduct, iCatagory} from "../../../Models/AdminModels";
import { FormikProps } from "formik";
import { generator } from '../../../../../Services/tools';
import { GetProdItem } from '../../../../../Services/ConectToServerServices';
import Select from 'react-select';


function getCatagory(): Array<iProduct>
{
    var xListForItem:any[] = []
    GetProdItem().then(res => {
        res.data
        .map((y:iProduct) => {
        //console.log(y, "res from server")
        return xListForItem.push(y)
        })
        //this.forceUpdate()
    })
    return xListForItem
}


export const InnerFormCatagory = (props: OtherProps & FormikProps<iCatagory>) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        title = 'Catagory',
        buttonText= 'Done'
    } = props;

    function CustomhandleChange(e:any) {
        
        console.log('Select onChange',e);
        values.Products = e;
        handleChange(e)
        handleBlur(e)
    }

    
    return (
        <div className="form-style">
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
            <label>Catagory Name</label>
            <div >
                <input
                width={50}
                type="text"
                name="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Name}
                />
            </div>

            
            
            <label>Content</label>
            
            <Select 
                key={generator()}
                inputId={generator()}
                isMulti={true}
                value={values.Products} 
                onChange={CustomhandleChange} 
                styles={{container:(p)=>({...p,color:'black', maxwidth: '100px'})}}  
                options={getCatagory()}
                getOptionLabel={options => options.Name}
                getOptionValue={options => options.Name} 
            />
 
            {errors.Name && <div>{errors.Name}</div>}
            {errors.Products && <div>{errors.Products}</div>}

            <button
                type="submit"
                disabled={
                    isSubmitting ||
                    !!(errors.Name && touched.Name) ||
                    !!(errors.Products && touched.Products)
                    }
                >
                {buttonText}</button>

            </form>
        </div> 
    );
};