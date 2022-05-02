import React from 'react'
import { FormikProps } from "formik";
import { iWeightEntry } from '../../Models/WeightModels';

export const WeightInnerForm = (props: FormikProps<iWeightEntry>) => {
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
        console.log('Select end onChange',values.date);
        handleChange(e)
        handleBlur(e)
      }

    return (
        <div className="form-style">
            <h1>Weight Add Form</h1>
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
            

            <label>Weight</label>
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
            

            <label>bodyFat</label>
            <div >
                <input
                width={50}
                type="number"
                name="bodyFat"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bodyFat}
                />
            </div>
            {errors.bodyFat && <div className="invalidCheck">{errors.bodyFat}</div>}
           

            <label>muscleMass</label>
            <div >
                <input
                width={50}
                type="number"
                name="muscleMass"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.muscleMass}
                />
            </div>
            {errors.muscleMass && <div className="invalidCheck">{errors.muscleMass}</div>}
            

            <label>waterDensity</label>
            <div >
                <input
                width={50}
                type="number"
                name="waterDensity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.waterDensity}
                />
            </div>
            {errors.waterDensity && <div className="invalidCheck">{errors.waterDensity}</div>}
            

            <label>boneDensity</label>
            <div >
                <input
                width={50}
                type="number"
                name="boneDensity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.boneDensity}
                />
            </div>
            {errors.boneDensity && <div className="invalidCheck">{errors.boneDensity}</div>}

            <label>Notes</label>
            <div >
                <input
                width={50}
                type="text"
                name="notes"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.notes}
                />
            </div>


            <button 
                type="submit"
                disabled={
                    isSubmitting 
                    ||!!(errors.date && touched.date)
                    ||!!(errors.weight && touched.weight)
                    ||!!(errors.bodyFat && touched.bodyFat)
                    ||!!(errors.muscleMass && touched.muscleMass)
                    ||!!(errors.waterDensity && touched.waterDensity)
                    ||!!(errors.boneDensity && touched.boneDensity)

                }
                >
                Done </button>
            </form>
        </div> 
    );
};