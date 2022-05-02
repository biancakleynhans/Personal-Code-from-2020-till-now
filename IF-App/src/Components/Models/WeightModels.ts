export interface iWeightEntry
{
    
    date?:        Date,
    weight?:      number,
    bodyFat?:     number, 
    muscleMass?:  number,  
    waterDensity?:number, 
    boneDensity?: number, 
    notes?:      string

}

export interface WeightObjectForChart 
{
   
    date?: Date;
    weight?: number;
}

export 

interface FormPropsWeight{
    date?:        Date,
    weight?:      number,
    bodyFat?:     number, 
    muscleMass?:  number,  
    waterDensity?:number, 
    boneDensity?: number, 
    notes?:      string
}



  