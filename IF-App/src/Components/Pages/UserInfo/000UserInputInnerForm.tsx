import React from 'react'
import { FormikProps } from "formik";
import Select from 'react-select';
import { generator } from '../../Util/tools';

export const ActiveLevelsOptions = [
    "None","Little", "Light", "Moderate", "Very", "Extra"
]

export interface iUserInfo{

    date:Date,
    height: number,
    age: number,
    weight: number,
    sex: string,
    bmi?: number,
    bmr?: number,
    calReq?: number,
    activeLevel: string

}

export interface FormPropsUserInfo{
    date?:Date,
    height?: number,
    age?: number,
    weight?: number,
    sex?: string,
    bmi?: number,
    bmr?: number,
    calReq? : number
    activeLevel?: string
}

export function BMI(weight:number, height:number)
{
    //  [weight (kg) / height (cm) / height (cm)] x 10,000
    //console.log(weight, height, "got this info for bmi")
    if (weight !== undefined && height !== undefined)
    {
        var bmi =  (weight / height / height) * 10000
        //console.log(bmi, "BMI")
        return bmi
    }
    else
    {return 0}

}

export function BMR(age:number, weight:number, height:number, gender: string)
{
    // BMR for Men = 66.47 + (13.7 * weight [kg]) + (5 * height [cm]) − (6.8 * age [years])
    // BMR for Women = 655.1 + (9.6 * weight [kg]) + (1.8 * height [cm]) − (4.7 * age [years])
    //console.log(age, weight, height, gender, "got this info for bmr")

    if (weight !== undefined && height !== undefined && age !== undefined && gender !== undefined)
    {
        if(gender === "Female" ||gender === "female" )
        {
            var bmi = 655.1 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
            //console.log("female", bmi)
            return bmi

        }
        if(gender === "Male" ||gender === "male" )
        {
            var bmiM = 66.47 + (13.7 * weight) + (5 * height) - (6.8 * age)
            //console.log("male", bmiM)
            return bmiM
        }
        else{return 0}
    }
    else{return 0}
}

export const UserInfoInnerForm = (props: FormikProps<iUserInfo>) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props;

    function date(e:any) {
        var d = new Date(e.target.value)
        values.date = d
        // console.log('Select end onChange',values.date);
        handleChange(e)
        handleBlur(e)
    }

    function CustomhandleChange(e:any) {
        
        // console.log('Select onChange',e, values.bmr);
        values.activeLevel = e
        handleChange(e)
        handleBlur(e)

        /// workout cal req 
        //"None","Little", "Light", "Moderate", "Very", "Extra"
        if(values.bmr !== undefined){
            if(e === "None")     {var cal = values.bmr * 1.2;    console.log(cal, "cal");   return values.calReq =  cal}
            if(e === "Little")   {var cal0 = values.bmr * 1.2;   console.log(cal0, "cal");  return values.calReq =  cal0}
            if(e === "Light")    {var cal1 = values.bmr * 1.375; console.log(cal1, "cal");  return values.calReq =  cal1}
            if(e === "Moderate") {var cal2 = values.bmr * 1.55;  console.log(cal2, "cal");  return values.calReq =  cal2}
            if(e === "Very")     {var cal3 = values.bmr * 1.725; console.log(cal3, "cal");  return values.calReq =  cal3}
            if(e === "Extra")    {var cal4 = values.bmr * 1.9;   console.log(cal4, "cal");  return values.calReq =  cal4}
        }
    }


    return (
        <div className="form-style">
            <h1>User Info Add</h1>
            <form onSubmit={handleSubmit}>
            
            <label>Date</label>
            <div >
                <input
                width={50}
                type="datetime-local"
                name="date"
                onChange={date}
                />
            </div>
            {errors.date && <div className="invalidCheck">{errors.date}</div>}
            
            <br/>

            <label>Weight In Kg</label>
            <div >
                <input
                width={50}
                type="number"
                name="weight"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.weight}
                />
            </div>
            {errors.weight && <div className="invalidCheck">{errors.weight}</div>}
            <br/>

            <label>Height In Cm</label>
            <div >
                <input
                width={50}
                type="number"
                name="height"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.height}
                />
            </div>
            {errors.height && <div className="invalidCheck">{errors.height}</div>}
            <br/>

            <label>Gender</label>
            <div >
                <input
                width={50}
                type="text"
                name="sex"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sex}
                />
            </div>
            {errors.sex && <div className="invalidCheck">{errors.sex}</div>}
            <br/>

            <label>Age</label>
            <div >
                <input
                width={50}
                type="number"
                name="age"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
                />
            </div>
            {errors.age && <div className="invalidCheck">{errors.age}</div>}
            <br/>

             <label>Active Level</label> <br/>
             <p>
                Please select One <br/>
                <strong> Exercise Level : </strong><br/>
                No to little exercise (1 days/wk); <br/>
                Light exercise (2 days/wk); <br/>
                Moderate exercise (3-5 days/wk);  <br/>
                Very active (6-7 days/wk);  <br/>
                Extra active (very active and physical job) <br/>
             </p>
            <div >
               <Select
                key={generator()}
                inputId={generator()}
                value={values.activeLevel} 
                onChange={CustomhandleChange} 
                styles={{container:(p)=>({...p,color:'black', maxwidth: '100px'})}}  
                options={ActiveLevelsOptions}
                getOptionLabel={options => options}
            />
            </div>
            {errors.activeLevel && <div className="invalidCheck">{errors.activeLevel}</div>}
            <br/>

            <br/>
            BMI: { values.bmi =  BMI(values.weight, values.height)}
            <br/>
            BMR: { values.bmr =  BMR(values.age,values.weight, values.height, values.sex )}
            <br/>
            Calories required: { values.calReq}
            <br/><br/>
           

            <button 
                type="submit"
                disabled={
                    isSubmitting 
                    ||!!(errors.date && touched.date)
                    ||!!(errors.weight && touched.weight)
                    ||!!(errors.height && touched.height)
                    ||!!(errors.age && touched.age)
                    ||!!(errors.sex && touched.sex)
                    ||!!(errors.activeLevel && touched.activeLevel)
                }
                >
                Done </button>
            </form>
        </div> 
    );
};