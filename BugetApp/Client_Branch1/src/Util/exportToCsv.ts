function DownloadDataAsCsv(filename: string,csvContent ){
    
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}


export function getDataToDownload(rowsOfData: object[], filename: string){
  if (!rowsOfData || !rowsOfData.length) {
    return;
  }
  // const separator = ',';
  const keys = Object.keys(rowsOfData[0]);
  const csvContent =
    keys.join(",") +
    '\n' +
    rowsOfData.map(row => {
      return keys.map(k => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        cell = cell instanceof Date
          ? cell.toLocaleString()
          : cell.toString().replace(/"/g, '""');
        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(",");
    }).join('\n');
    console.log(csvContent, "csvContent")
    DownloadDataAsCsv(filename, csvContent)
}


export function getDataToSaveLocally(rowsOfData: object[], filename){
  if (!rowsOfData || !rowsOfData.length) {
    return;
  }
  // const separator = ',';
  const keys = Object.keys(rowsOfData[0]);
  const csvContent =
    keys.join(",") +
    '\n' +
    rowsOfData.map(row => {
      return keys.map(k => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        cell = cell instanceof Date
          ? cell.toLocaleString()
          : cell.toString().replace(/"/g, '""');
        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(",");
    }).join('\n');
    console.log(csvContent, "csvContent")
    // DownloadDataAsCsv(filename, csvContent)
    // var ls = new LocalStorage("pdf", "converted")
    // ls.AddToLocalStorage(csvContent)
} 
