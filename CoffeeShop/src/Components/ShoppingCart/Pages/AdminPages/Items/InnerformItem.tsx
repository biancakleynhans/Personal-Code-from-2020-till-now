import React from 'react'
import Select from 'react-select';
import { FormikProps } from "formik";
import { OtherProps } from "../../../Models/PropsForForms";
import { iItem, PreplistItemsToChooseFromOptions } from "../../../Models/AdminModels";
import { generator } from '../../../../../Services/tools';


export const InnerFormItem = (props: OtherProps & FormikProps<iItem>) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        title = 'Items',
        buttonText= 'Done'
    } = props;

    function CustomhandleChange(e:any) {
        
        console.log('Select onChange',e);
        values.PrepMethod = e
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
                name="ItemCost"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ItemCost}
                />
            </div>

            <label>Portion Quantity</label>
            <div >
                <input
                width={50}
                type="number"
                name="PortionSize"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.PortionSize}
                />
            </div>

            <label>Portion Value</label>
            <div >
                <input
                width={50}
                type="text"
                name="PortionValue"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.PortionValue}
                />
            </div>

            <label>Please select Prep List Options</label>
            <Select 
                key={generator()}
                inputId={generator()}
                isMulti={true}
                value={values.PrepMethod} 
                onChange={CustomhandleChange} 
                styles={{container:(p)=>({...p,color:'black', maxwidth: '100px'})}}  
                options={PreplistItemsToChooseFromOptions}
                getOptionLabel={options => options}
                getOptionValue={options => options} 
            />


            {errors.Name && <div>{errors.Name}</div>}
            {errors.ItemCost && <div>{errors.ItemCost}</div>}
            {errors.PortionSize && <div>{errors.PortionSize}</div>}
            {errors.PortionValue && <div>{errors.PortionValue}</div>}


            <button 
                type="submit"
                disabled={
                    isSubmitting ||
                    !!(errors.Name && touched.Name) ||
                    !!(errors.ItemCost && touched.ItemCost)||
                    !!(errors.PortionSize && touched.PortionSize) ||
                    !!(errors.PortionValue && touched.PortionValue)
                    }
                >
                {buttonText}</button>

            </form>
        </div> 
    );
};