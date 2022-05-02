import React, {Component } from 'react';
import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { getDataToDownload, getDataToSaveLocally } from '../../Util/exportToCsv';
import { iColAndTexts, itext } from '../Models/interfaces';
import {NamedDictionary}from '../../Service/tools'
import DownloadConvertedFile from './003_DownloadConvertedFile';
import {Redirect}from 'react-router-dom'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const popColumn=(d:NamedDictionary<iColAndTexts>, getX:(i:itext)=>number, t:itext, getY:(i:itext)=>number)=>{
  var use = Math.round(getX(t)/15)*15
  var useY = Math.round(getY(t)/1)*1
  if(!d[use])
  {
    d[use]={ nrCols:0, texts:[], yPoints:[]} as iColAndTexts;
  }
 let colinfo= ( d[use]);
 colinfo.nrCols+=1;
 colinfo.texts.push(t.str);
 colinfo.yPoints.push( useY )
 colinfo.xPos = use
}

const popRows=(d:NamedDictionary<iColAndTexts>, getY:(i:itext)=>number, t:itext, getX:(i:itext)=>number, pageNr)=>{
  var use = Math.round(getY(t)/3)*3 
  var useX = Math.round(getX(t)/1)*1
  if(!d[use])
  {
    d[use]={pageNr: 0, nrCols:0, texts:[], xPoints:[]} as iColAndTexts;
  }
 let colinfo= ( d[use]);
 colinfo.pageNr = pageNr
 colinfo.nrCols+=1;
 colinfo.texts.push(t.str);
 colinfo.xPoints.push( useX )
 colinfo.yPos = use
}

function RowExtractor(rowsToUse,ArrayToCreateFromData ){
  var row = Object.assign([],rowsToUse)
    
  row.forEach((entry)=>{
      // console.log('entry',entry.texts);
      if(entry.nrCols > 4 && entry.nrCols < 7){
        ArrayToCreateFromData.push(entry)
        return ArrayToCreateFromData
      } 
    })
    // console.log('RowExtractor: ',ArrayToCreateFromData);
    return ArrayToCreateFromData;
}

function getColNeeded(colsToUse,ArrayToCreateFromData ){
  var col = Object.assign([],colsToUse)
  var regExFloat = /(\d{1,2})\s(\d{1,3})[.](\d{1,2})|((\d{1,2})[.](\d{1,2}))/g
  // console.log('col: ',col);

  // eslint-disable-next-line
  col.filter((colPoint, index) => {

    if(colPoint.xPos === 390) //Money In
    {
      colPoint.texts.filter(i => i.match(regExFloat));
      // console.log(res , " MoneyIn res",index, colPoint)
      ArrayToCreateFromData.push( colPoint)
    }
    if(colPoint.xPos === 465) //Money Out
    {
      colPoint.texts.filter(i => i.match(regExFloat));
      // console.log(res, "MoneyOut res",index, colPoint)
      ArrayToCreateFromData.push( colPoint)
    }
    if(colPoint.xPos === 555) //Balance
    {
      colPoint.texts.filter(i => i.match(regExFloat));
      // console.log(res, "Balance res",index, colPoint)
      ArrayToCreateFromData.push( colPoint)
    }
  });
  // console.log("getColNeeded", ArrayToCreateFromData)
  return ArrayToCreateFromData

}

function addMissingEntryToArrays (RE, gCN){
  var doneArr

  RE.forEach(re_entry => {
    // console.log(re_entry, "???>>???")
    //Use for xPos match
    // console.log( "pointer MoneyIn", gCN[0].xPos) // 396
    // console.log( "pointer MoneyOut", gCN[1].xPos) // 465

    //console.log("re_entry", re_entry)
    //console.log("re_entry XPoints", re_entry.xPoints[3])

    // console.log("WTF? ", re_entry.xPoints[3], "< ",gCN[0].xPos, "&&", re_entry.xPoints[3], "<=",  gCN[1].xPos ) //MoneyIn
    // console.log("WTF? ", re_entry.xPoints[3]  ,">" ,gCN[0].xPos, "&&" ,re_entry.xPoints[3], "< ",gCN[1].xPos, "&&", re_entry.xPoints[3], "<=",  gCN[2].xPos ) // MoneyOut
    
    if(re_entry.nrCols === 5){
      if(re_entry.xPoints[3]  < gCN[0].xPos && re_entry.xPoints[3]  <=  gCN[1].xPos ){
        re_entry.nrCols = re_entry.nrCols+1
        re_entry.texts.splice(4,0,"00.0")
        re_entry.xPoints.splice(4,0,465)
        // console.log("re_entry Has  MoneyIn", re_entry)
        return re_entry
      }

      if(re_entry.xPoints[3]  > gCN[0].xPos && re_entry.xPoints[3]  < gCN[1].xPos && re_entry.xPoints[3]  <=  gCN[2].xPos ){
        re_entry.nrCols = re_entry.nrCols+1
        re_entry.texts.splice(3,0,"00.0")
        re_entry.xPoints.splice(3,0,396)
        // console.log("re_entry Has  MoneyOut", re_entry)
        return re_entry
      }
    }
    
  });
  doneArr = Object.assign(RE)
  // console.log("doneArr", doneArr)
  return doneArr
}

function PrepareArrayFor_CSV_ConversionAndDownload (FinalSortedCleanedArrray){
  
  var StringArrayFromFinished = []
  if(FinalSortedCleanedArrray !== undefined){
    const FSCA = Object.assign(FinalSortedCleanedArrray)
  
    // FSCA.splice(0,1)

    FSCA.forEach(f_entry => {
      // console.log("f_entry", f_entry)
      StringArrayFromFinished.push(f_entry.texts)
      // console.log("StringArrayFromFinished", StringArrayFromFinished)
      return StringArrayFromFinished
    })
  }
  // console.log("StringArrayFromFinished", StringArrayFromFinished)
  return Promise.resolve( StringArrayFromFinished)
  
}

function pdfToPlainText(pdfData) {
  // console.log(pdfData,pdfName, "pdfData")
  pdfjs.disableWorker = true;
  var pdfDoc = pdfjs.getDocument(pdfData)
  return Promise.resolve(pdfDoc)
}

// function getPages(pdf, pdfName) {
//   // console.log(pdf,pdfName, "pdf")

//   var downName = pdfName.replace(".pdf", ".csv")
//   // console.log("pdfName", pdfName, "=>", "downName", downName)
//   var pagesPromises = [];

//   for (var i = 0; i < pdf.numPages; i++) {
//       // Required to prevent that i is always the total of pages
//       (function (pageNumber) {
//           // Store the promise of getPageText that returns the text of a page
//           // console.log(pageNumber, pdf)
//           pagesPromises.push(getPageText(pageNumber, pdf));
//           // pagesPromises.push(getMultiPageText(pageNumber, pdf));
//       })(i + 1);
//   }
//   var ArrAll = []
//   // Execute all the promises
//   Promise.all(pagesPromises).then(output =>{
    
//     // console.log("outPut", output)
//     output.forEach(arr => {
//       // console.log("arr", arr.length)
//       arr.forEach(arS => {
//         // console.log("ars", arS)
//         ArrAll.push(arS)
//         return ArrAll
//       });
//     })
    
//     // PrepareArrayFor_CSV_ConversionAndDownload(ArrAll).then((d)=>{
//     //   console.log("d",d)
//     //   // getDataToDownload(d,downName )
//     //   // getDataToSaveLocally(d, downName)
//     // })
//     return Promise.resolve(ArrAll)
//   })
//   console.log("ArrAll",ArrAll)
//   return Promise.resolve(ArrAll)
// }

// function getPageText(pageNumber, page){
//   // console.log("pageNumber, page", pageNumber, page)
//   var x=4,y=5;
//   var colsRight:NamedDictionary<iColAndTexts> = {};
//   var rowsFull: NamedDictionary<iColAndTexts> = {}
//   const ArrayFromData_RE = []
//   const ArrayFromData_gCN = []
//   var RE
//   var gCN
//   var FinalSortedCleanedArrray
//   return new Promise((resolve, reject)=> {
//     page.getPage(pageNumber).then((pdfPage)=> {
//       pdfPage.getTextContent().then(function (textContent) {
//         // console.log("getPageText => textContent", textContent)
//         var textItems = textContent.items;
//         // console.log("textItems", textItems)

//         textItems.forEach(t=>{
//           // popColumn(colsLeft,(t)=>t.transform[x],t,(t)=>t.transform[y] )
//           popColumn(colsRight,(t)=>t.transform[x]+t.width,t, (t)=>t.transform[y])
//           popRows(rowsFull,(t)=>t.transform[y],t, (t)=>t.transform[x],pageNumber)

//         })

//         // console.log('colsLeft: ',colsLeft);
//         // console.log('colsRight: ',colsRight);
//         // console.log('rowsFull: ',rowsFull);

//         RE = RowExtractor(rowsFull, ArrayFromData_RE)
//         gCN = getColNeeded(colsRight, ArrayFromData_gCN)

//         // console.log("Inside RE", RE)
//         // console.log("Inside gCN", gCN)

//         FinalSortedCleanedArrray = addMissingEntryToArrays(RE, gCN)
//         FinalSortedCleanedArrray.reverse();
//         // console.log("FinalSortedCleanedArrray", FinalSortedCleanedArrray)

//         PrepareArrayFor_CSV_ConversionAndDownload(FinalSortedCleanedArrray)

//         // Solve promise with the text retrieven from the page
//         resolve(FinalSortedCleanedArrray);
//       });
      
//     });
//   });
 
// }



export default class PfdConverter extends Component {

  
  GetPdfFromInput(){
    return <input type="file" name="" id="" onChange={e=> this.onchange(e)}/>
  }


  onchange(e){
      // console.log(e.target.files, "e")
      var file = e.target.files && e.target.files[0];
      // console.log(file.name, "file")
      var fileName = file.name
      if(file!== null){
        
        var fileReader = new FileReader(); 
        fileReader.onload = (readerEvt: any) => {
          console.log(fileReader.result, "fileReader", readerEvt)
          this.pdfToPlainText(fileReader.result)
        //   .then((ptpt)=>{getPages(ptpt, fileName)})
        } 
        fileReader.readAsArrayBuffer(file)

        // fileReader.onload = function() {
        //   console.log(fileReader.result, "fileReader")
        //   pdfToPlainText(fileReader.result)
        //   .then((ptpt)=>{getPages(ptpt, fileName)})
        // }
        // fileReader.readAsArrayBuffer(file)
      }
  }

  pdfToPlainText(pdfData) {
    // console.log(pdfData,pdfName, "pdfData")
    pdfjs.disableWorker = true;
    var pdfDoc = pdfjs.getDocument(pdfData)
    return Promise.resolve(pdfDoc)
  }

  getPages(pdf, pdfName) {
    // console.log(pdf,pdfName, "pdf")
  
    var downName = pdfName.replace(".pdf", ".csv")
    // console.log("pdfName", pdfName, "=>", "downName", downName)
    var pagesPromises = [];
  
    for (var i = 0; i < pdf.numPages; i++) {
        // Required to prevent that i is always the total of pages
        (function (pageNumber) {
            // Store the promise of getPageText that returns the text of a page
            // console.log(pageNumber, pdf)
            pagesPromises.push(this.getPageText(pageNumber, pdf));
            // pagesPromises.push(getMultiPageText(pageNumber, pdf));
        })(i + 1);
    }
    var ArrAll = []
    // Execute all the promises
    Promise.all(pagesPromises).then(output =>{
      
      // console.log("outPut", output)
      output.forEach(arr => {
        // console.log("arr", arr.length)
        arr.forEach(arS => {
          // console.log("ars", arS)
          ArrAll.push(arS)
          return ArrAll
        });
      })
      
      // PrepareArrayFor_CSV_ConversionAndDownload(ArrAll).then((d)=>{
      //   console.log("d",d)
      //   // getDataToDownload(d,downName )
      //   // getDataToSaveLocally(d, downName)
      // })
      return Promise.resolve(ArrAll)
    })
    console.log("ArrAll",ArrAll)
    return Promise.resolve(ArrAll)
  }
  
  getPageText(pageNumber, page){
    // console.log("pageNumber, page", pageNumber, page)
    var x=4,y=5;
    var colsRight:NamedDictionary<iColAndTexts> = {};
    var rowsFull: NamedDictionary<iColAndTexts> = {}
    const ArrayFromData_RE = []
    const ArrayFromData_gCN = []
    var RE
    var gCN
    var FinalSortedCleanedArrray
    return new Promise((resolve, reject)=> {
      page.getPage(pageNumber).then((pdfPage)=> {
        pdfPage.getTextContent().then(function (textContent) {
          // console.log("getPageText => textContent", textContent)
          var textItems = textContent.items;
          // console.log("textItems", textItems)
  
          textItems.forEach(t=>{
            // popColumn(colsLeft,(t)=>t.transform[x],t,(t)=>t.transform[y] )
            popColumn(colsRight,(t)=>t.transform[x]+t.width,t, (t)=>t.transform[y])
            popRows(rowsFull,(t)=>t.transform[y],t, (t)=>t.transform[x],pageNumber)
  
          })
  
          // console.log('colsLeft: ',colsLeft);
          // console.log('colsRight: ',colsRight);
          // console.log('rowsFull: ',rowsFull);
  
          RE = RowExtractor(rowsFull, ArrayFromData_RE)
          gCN = getColNeeded(colsRight, ArrayFromData_gCN)
  
          // console.log("Inside RE", RE)
          // console.log("Inside gCN", gCN)
  
          FinalSortedCleanedArrray = addMissingEntryToArrays(RE, gCN)
          FinalSortedCleanedArrray.reverse();
          // console.log("FinalSortedCleanedArrray", FinalSortedCleanedArrray)
  
          PrepareArrayFor_CSV_ConversionAndDownload(FinalSortedCleanedArrray)
  
          // Solve promise with the text retrieven from the page
          resolve(FinalSortedCleanedArrray);
        });
        
      });
    });
   
  }
  
  LoadOrEdit(data){
    // console.log('data',data)
    const trigger = data;
    if (trigger !== undefined) {
      return <DownloadConvertedFile {...data}/>
    }
  return this.GetPdfFromInput();
  }

  render() {
   
    return (
      <div>
        <h1>Please select a pdf to convert to csv <br/> download will happen automatically after convertion </h1>
        {this.GetPdfFromInput()}
        
      </div>
    )
  }
}
