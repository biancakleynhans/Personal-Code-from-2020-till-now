export interface iColAndTexts{
    pageNr: number
    nrCols:number
    texts:string[]
    yPoints: number[],
    xPoints: number[],
    yPos: number
    xPos: number
}
   
export interface itext{str:string,width:number,transform:number[]}


export interface iExpense {
    PostingDate: string,
    TransactionDate: string,
    Description: string,
    MoneyIn: string ,
    MoneyOut: string,
    Balance:  string,
    Planned?: boolean,
    RecurringExpence?: boolean,
    
}

export interface iTypeOfExpence{}

  