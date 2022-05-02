import * as React from 'react'
import { OtherProps } from "../../../Models/PropsForForms";
import { iProduct, iItem} from "../../../Models/AdminModels";
import { FormikProps } from "formik";
import { GetInvItem } from '../../../../../Services/ConectToServerServices';
import Select from 'react-select';
import { generator } from '../../../../../Services/tools';


function getItems(): Array<iItem>
{
    var xListForItem:any[] = []
    GetInvItem().then(res => {
        res.data
        .map((y:iItem) => {
        //console.log(y, "res from server")
        return xListForItem.push(y)
        })
    })
    return xListForItem
}


export const InnerFormProduct = (props: OtherProps & FormikProps<iProduct>) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        title = 'Product',
        buttonText= 'Done'
    } = props;

    function CustomhandleChange(e:any) {
        
        console.log('Select onChange',e);
        values.Content = e;
        handleChange(e)
        handleBlur(e)
    }

    
    return (
        <div className="form-style">
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
            <label>Item Name</label>
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

            <label>Item Price in ZAR</label>
            <div >
                <input
                width={50}
                type="number"
                name="Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Price}
                />
            </div>

            <label>Description</label>
            <div >
                <input
                width={100}
                type="text"
                name="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Description}
                />
            </div>

            <label>Content</label>
            
            <Select 
                key={generator()}
                inputId={generator()}
                isMulti={true}
                value={values.Content} 
                onChange={CustomhandleChange} 
                styles={{container:(p)=>({...p,color:'black', maxwidth: '100px'})}}  
                options={getItems()}
                getOptionLabel={options => options.Name}
                getOptionValue={options => options.Name} 
            />
 
            {errors.Name && <div>{errors.Name}</div>}
            {errors.Price && <div>{errors.Price}</div>}
            {errors.Description && <div>{errors.Description}</div>}
            {errors.Content && <div>{errors.Content}</div>}

            <button
                type="submit"
                disabled={
                    isSubmitting ||
                    !!(errors.Name && touched.Name) ||
                    !!(errors.Price && touched.Price)||
                    !!(errors.Description && touched.Description)||
                    !!(errors.Content && touched.Content)
                    }
                >
                {buttonText}</button>

            </form>
        </div> 
    );
};